import { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import authenticateStore from "../../../store/authenticate.store";
import { Category, MeasureUnit, Product } from "../../../types/product.model";

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 550px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  productId: number | null;
}

const customStyles = {
  content: {
    width: '600px',
    height: 'auto',
    margin: 'auto',
    padding: '10px',
    borderRadius: '8px',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export default function UpdateProductModal({ isOpen, onRequestClose, productId }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const { user } = authenticateStore;
  const [formData, setFormData] = useState<Product>({
    name: "",
    supplier: null,
    measureUnit: MeasureUnit.UNIT,
    category: Category.OTHER,
    unitPrice: 0,
    maxStockLevel: 0,
    description: ""
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:8081/api/v1/products/${productId}`, {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
        setProduct(response.data);
        setFormData(response.data); // Popula o formulário com os dados do produto
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
      }
    };

    if (isOpen) {
      fetchProductDetails();
    }
  }, [isOpen, productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8081/api/v1/products/${productId}`, formData, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      onRequestClose(); // Fecha o modal após a atualização
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
      <ModalContent>
        <>
          <h2>Atualizar Produto</h2>
          <p><strong>ID:</strong> {product?.id}</p>
          <p><strong>Código:</strong> {product?.code}</p>
          
          <label>Nome:</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Fornecedor:</label>
          <Input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
          />

          <label>Unidade de Medida:</label>
          <Select
            id="measureUnit"
            name="measureUnit"
            value={formData.measureUnit}
            onChange={handleChange}
          >
            {Object.values(MeasureUnit).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>

          <label>Categoria:</label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {Object.values(Category).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <label>Preço:</label>
          <Input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
          />

          <label>Nível Máximo de Estoque:</label>
          <Input
            type="number"
            name="maxStocklevel"
            value={formData.maxStockLevel}
            onChange={handleChange}
          />

          <label>Descrição:</label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <Button onClick={handleSubmit}>Atualizar</Button>
          <Button onClick={onRequestClose} style={{ backgroundColor: '#f44336' }}>Cancelar</Button>
        </>
      </ModalContent>
    </Modal>
  );
}
