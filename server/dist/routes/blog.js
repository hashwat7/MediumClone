"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.send("get blog route");
});
router.post("/", (req, res) => {
    res.send("Create blog route");
});
router.put("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.send("Update blog route");
});
exports.default = router;
