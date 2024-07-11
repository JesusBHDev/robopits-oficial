import { useState, useEffect } from "react";
import {
  getAllProductos,
  crearProducto,
  updateProducto,
  EliminarProducto,
  getProducto,
  getAllCategorias,
} from "../../api/auth.js";

export function useProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductData, setNewProductData] = useState({
    IdProducto: "",
    NameProducto: "",
    Categoria: "",
    Precio: "",
    Existencias: "",
    Descripcion: "",
    Caracteristicas: "",
    Incluye: "",
    Imagen: null,
    ImagenURL: "",
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getAllProductos()
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setNewProductData({
        ...selectedProduct,
        ImagenURL: selectedProduct.Imagen, // Establecer el enlace de la imagen en el nuevo estado
      });
    }
  }, [selectedProduct]);

  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    getAllCategorias()
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías", error);
      });
  }, []);
  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setEditMode(false);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Leer el archivo como URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductData((prevData) => ({
          ...prevData,
          Imagen: file,
          ImagenURL: reader.result, // Establecer la URL de la imagen en el nuevo estado
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("IdProducto", newProductData.IdProducto);
    formData.append("NameProducto", newProductData.NameProducto);
    formData.append("Categoria", newProductData.Categoria);
    formData.append("Precio", newProductData.Precio);
    formData.append("Existencias", newProductData.Existencias);
    formData.append("Descripcion", newProductData.Descripcion);
    formData.append("Caracteristicas", newProductData.Caracteristicas);
    formData.append("Incluye", newProductData.Incluye);
    formData.append("Imagen", newProductData.Imagen);

    try {
      if (editMode && selectedProduct) {
        const updatedProduct = await updateProducto(
          selectedProduct._id,
          formData
        ); // Corregido el uso de updateProducto
        console.log("Producto actualizado exitosamente:", updatedProduct);
        const updatedProducts = productos.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        setProductos(updatedProducts);
        setEditMode(false);
        getAllProductos()
          .then((response) => {
            setProductos(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener productos", error);
          });
      } else {
        const createdProduct = await crearProducto(formData);
        console.log("Producto creado exitosamente:", createdProduct);
        getAllProductos()
          .then((response) => {
            setProductos(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener productos", error);
          });
        setNewProductData({
          IdProducto: "",
          NameProducto: "",
          Categoria: "",
          Precio: "",
          Existencias: "",
          Descripcion: "",
          Caracteristicas: "",
          Incluye: "",
          Imagen: null,
        });
        setShowNewProductForm(false);
      }
    } catch (error) {
      console.error("Error al guardar cambios", error);
    }
  };

  const toggleNewProductForm = () => {
    setShowNewProductForm((prevState) => !prevState);
  };

  const closeNewProductForm = () => {
    setShowNewProductForm(false);
  };

  const openEditProductForm = () => {
    setEditMode(true);
    // Establecer los datos del producto seleccionado
    setNewProductData({
      ...selectedProduct,
      Imagen: selectedProduct.Imagen, // Conservar el enlace de la imagen actual
    });
  };
  const handleRefresh = async () => {
    try {
      const response = await getProducto(selectedProduct._id);
      const updatedProduct = response.data;
      setSelectedProduct(updatedProduct);
    } catch (error) {
      console.error("Error al refrescar el producto", error);
    }
  };

  const handleDeleteProduct = (productId) => {
    EliminarProducto(productId)
      .then((response) => {
        // Filtrar los productos para eliminar el que coincida con el productId
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto._id !== productId)
        );
        console.log("Producto eliminado correctamente");
        // Opcional: cerrar los detalles del producto después de eliminarlo
        closeProductDetails();
      })
      .catch((error) => {
        console.error("Error al eliminar el producto", error);
      });
  };
}
