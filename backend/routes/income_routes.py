from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.income import Income
from models.expense import Expense

income_bp = Blueprint("income", __name__)

@income_bp.route("/income", methods=["GET"])
@jwt_required()
def get_income():
    uid = int(get_jwt_identity())
    items = Income.query.filter_by(user_id=uid).order_by(Income.date.desc()).all()
    return jsonify([i.to_dict() for i in items]), 200

@income_bp.route("/income", methods=["POST"])
@jwt_required()
def add_income():
    uid = int(get_jwt_identity())
    data = request.get_json() or {}

    required = ["title", "amount", "date"]
    if not all(data.get(k) for k in required):
        return jsonify({"error": "Missing fields"}), 400

    income = Income(
        user_id=uid,
        title=data["title"],
        amount=float(data["amount"]),
        category=data.get("category", "Other"),
        description=data.get("description", ""),
        date=data["date"],
    )
    db.session.add(income)
    db.session.commit()
    return jsonify(income.to_dict()), 201

@income_bp.route("/income/<int:id>", methods=["PUT"])
@jwt_required()
def update_income(id):
    uid = int(get_jwt_identity())
    income = Income.query.filter_by(id=id, user_id=uid).first_or_404()
    data = request.get_json() or {}

    for key in ["title", "amount", "category", "description", "date"]:
        if key in data:
            setattr(income, key, data[key])

    if "amount" in data:
        income.amount = float(data["amount"])

    db.session.commit()
    return jsonify(income.to_dict()), 200

@income_bp.route("/income/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_income(id):
    uid = int(get_jwt_identity())
    income = Income.query.filter_by(id=id, user_id=uid).first_or_404()
    db.session.delete(income)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

@income_bp.route("/summary", methods=["GET"])
@jwt_required()
def summary():
    uid = int(get_jwt_identity())
    incomes = Income.query.filter_by(user_id=uid).all()
    expenses = Expense.query.filter_by(user_id=uid).all()

    total_income = sum(i.amount for i in incomes)
    total_expense = sum(e.amount for e in expenses)

    recent = (
        [{"type": "income", **i.to_dict()} for i in incomes[:5]] +
        [{"type": "expense", **e.to_dict()} for e in expenses[:5]]
    )
    recent = sorted(recent, key=lambda x: x["date"], reverse=True)[:8]

    return jsonify({
        "total_income": round(total_income, 2),
        "total_expense": round(total_expense, 2),
        "balance": round(total_income - total_expense, 2),
        "recent": recent,
    }), 200