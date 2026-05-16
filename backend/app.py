from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, jwt
from config import Config
from routes.auth_routes import auth_bp
from routes.expense_routes import expense_bp
from routes.income_routes import income_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, origins=[app.config["FRONTEND_URL"]], supports_credentials=True)

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(expense_bp, url_prefix="/api")
    app.register_blueprint(income_bp, url_prefix="/api")

    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok"})

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)