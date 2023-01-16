import express from "express";
import Carrito from "../../DAOs/Carrito.dao.class.js";
import userModel from "../../models/userSchema.js";

const router = express.Router();

const carrito = new Carrito(); 

router.post("/crearcarrito", async (req, res) =>{
    const carritoCreado = await carrito.crearCarrito();
    res.send(carritoCreado);
});

router.delete("/borrarcarrito/:id", async (req, res) => {
    const carritoBorrado = await carrito.borrar(req.params.id);
    res.send(carritoBorrado);
});

router.delete("/:id/borrarproducto/:id_prod", async (req, res) =>{
    const borrarProducto = await carrito.actualizar(
        req.params.id,
        req.params.id_prod,
    );
    res.send(borrarProducto);
});

router.get("/", async (req, res) => {
    const listaCarritos = await carrito.listarAll();
    res.send(listaCarritos);
});

router.get("/:id", async (req, res) => {
    const carritoPorId = await carrito.listar(req.params.id);
    res.send(carritoPorId);
});
router.post("/:id/agregarproducto/:idPrd", async (req, res) => {
    const respuesta = await carrito.guardarProductoEnCarrito(
        req.params.id,
        req.params.idPrd
    );
   res.send((respuesta))
});

router.post("/:id/finalizarcompra", async (req, res) =>{
    const postPedido = await carrito.completarPedido(req.params.id);
    res.send(postPedido)
})

export default router;