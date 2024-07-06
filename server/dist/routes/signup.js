"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    try {
        const user = yield prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password,
            },
        });
        const jwtToken = (0, jsonwebtoken_1.sign)({ id: user.id, name: user.name }, process.env.JWT_SECRET);
        res.json({ jwt: jwtToken });
    }
    catch (error) {
        console.error("Error signing up:", error);
        res.status(403).json({ error: "Error while signing up" });
    }
}));
exports.default = router;
