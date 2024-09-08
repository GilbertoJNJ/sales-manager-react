import { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import authenticateStore from "../../../store/authenticate.store";
import { Product } from "../../../types/product.model";

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

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
    productId: number | null;
}

const customStyles = {
    content: {
        width: '600px', // Definindo a largura do modal
        height: 'auto', // A altura será ajustada de acordo com o conteúdo
        margin: 'auto', // Para centralizar o modal horizontalmente
        padding: '10px',
        borderRadius: '8px',
        inset: '50% auto auto 50%', // Para centralizar verticalmente
        transform: 'translate(-50%, -50%)', // Ajusta o centro do modal
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    },
};

export default function ViewProductModal({ isOpen, onRequestClose, productId }: Props) {
    const [product, setProduct] = useState<Product | null>(null);
    const { user } = authenticateStore;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get<Product>(`http://localhost:8081/api/v1/products/${productId}`, {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    }
                });
                setProduct(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do produto:", error);
            }
        };

        if (isOpen) {
            fetchProductDetails();
        }
    }, [isOpen, productId]);

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
            <ModalContent>
                <>
                    <h2>Detalhes do Produto</h2>
                    <p><strong>ID:</strong> {product?.id}</p>
                    <p><strong>Nome:</strong> {product?.name}</p>
                    <p><strong>Código:</strong> {product?.code}</p>
                    <p><strong>Fornecedor:</strong> {product?.supplier}</p>
                    <p><strong>Unidade de Medida:</strong> {product?.measureUnit}</p>
                    <p><strong>Categoria:</strong> {product?.category}</p>
                    <p><strong>Preço:</strong> {product?.unitPrice}</p>
                    <p><strong>Quantidade em Estoque:</strong> {product?.stockQuantity}</p>
                    <p><strong>Nível Máximo de Estoque:</strong> {product?.maxStockLevel}</p>
                    <p><strong>Descrição</strong> {product?.description}</p>
                    <button onClick={onRequestClose}>Fechar</button>
                </>
            </ModalContent>
        </Modal>
    );
};