from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.expense import Expense

expense_bp = Blueprint("expenses", __name__)

@expense_bp.route("/expenses", methods=["GET"])
@jwt_required()
def get_expenses():
    uid = int(get_jwt_identity())
    items = Expense.query.filter_by(user_id=uid).order_by(Expense.date.desc()).all()
    return jsonify([e.to_dict() for e in items]), 200

@expense_bp.route("/expenses", methods=["POST"])
@jwt_required()
def add_expense():
    uid = int(get_jwt_identity())
    data = request.get_json() or {}

    required = ["title", "amount", "date"]
    if not all(data.get(k) for k in required):
        return jsonify({"error": "Missing fields"}), 400

    expense = Expense(
        user_id=uid,
        title=data["title"],
        amount=float(data["amount"]),
        category=data.get("category", "Other"),
        description=data.get("description", ""),
        date=data["date"],
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify(expense.to_dict()), 201

@expense_bp.route("/expenses/<int:id>", methods=["PUT"])
@jwt_required()
def update_expense(id):
    uid = int(get_jwt_identity())
    expense = Expense.query.filter_by(id=id, user_id=uid).first_or_404()
    data = request.get_json() or {}

    for key in ["title", "amount", "category", "description", "date"]:
        if key in data:
            setattr(expense, key, data[key])

    if "amount" in data:
        expense.amount = float(data["amount"])

    db.session.commit()
    return jsonify(expense.to_dict()), 200

@expense_bp.route("/expenses/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_expense(id):
    uid = int(get_jwt_identity())
    expense = Expense.query.filter_by(id=id, user_id=uid).first_or_404()
    db.session.delete(expense)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200