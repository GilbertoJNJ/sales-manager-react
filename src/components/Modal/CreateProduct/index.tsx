import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { Category, MeasureUnit } from "../../../types/product.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import authenticateStore from "../../../store/authenticate.store";

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 550px;
`;

const Form = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  padding: 20px;
  width: 550px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const CloseButton = styled.button`
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
`;

const ThreeColumnGrid = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
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

export default function CreateProductModal({ isOpen, onRequestClose }: Props) {
    const [name, setName] = useState<string>("");
    const [barCode, setBarCode] = useState<string>("");
    const [category, setCategory] = useState<Category>(Category.OTHER);
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [stockQuantity, setStockQuantity] = useState<number>(0);
    const [maxStockLevel, setMaxStockLevel] = useState<number>(0);
    const [measureUnit, setMeasureUnit] = useState<MeasureUnit>(MeasureUnit.UNIT);
    const [description, setDescription] = useState<string>("");

    const handleSubmit = () => {
        const product = {
            name,
            barCode,
            category: Object.keys(Category).find(key => Category[key as keyof typeof Category] === category),
            unitPrice,
            stockQuantity,
            maxStockLevel,
            measureUnit: Object.keys(MeasureUnit).find(key => MeasureUnit[key as keyof typeof MeasureUnit] === measureUnit),
            description,
        };

        const { user } = authenticateStore;

        axios.post('http://localhost:8081/api/v1/products', product, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        })
            .then(response => {
                console.log('Produto criado com sucesso:', response.data);
                onRequestClose();
            })
            .catch(error => {
                console.error('Erro ao criar produto:', error);
            });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
            <Form onSubmit={handleSubmit}>
                <Section>
                    <h2>Criar Produto</h2>
                    <CloseButton onClick={onRequestClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </CloseButton>
                </Section>
                <GridContainer>
                    <InputWrapper>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="barCode">Código</Label>
                        <Input
                            id="barCode"
                            type="text"
                            value={barCode}
                            onChange={(e) => setBarCode(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="category">Categoria</Label>
                        <Select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                        >
                            {Object.values(Category).map((label) => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </Select>
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="measureUnit">Unidade de Medida</Label>
                        <Select
                            id="measureUnit"
                            value={measureUnit}
                            onChange={(e) => setMeasureUnit(e.target.value as MeasureUnit)}
                        >
                            {Object.values(MeasureUnit).map((label) => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </Select>
                    </InputWrapper>
                </GridContainer>
                <ThreeColumnGrid>
                    <InputWrapper>
                        <Label htmlFor="unitPrice">Preço Unitário</Label>
                        <Input
                            id="unitPrice"
                            type="number"
                            step="0.01"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="stockQuantity">Quantidade em Estoque</Label>
                        <Input
                            id="stockQuantity"
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(parseInt(e.target.value, 10))}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="maxStockLevel">Nível Máximo de Estoque</Label>
                        <Input
                            id="maxStockLevel"
                            type="number"
                            value={maxStockLevel}
                            onChange={(e) => setMaxStockLevel(parseInt(e.target.value, 10))}
                        />
                    </InputWrapper>
                </ThreeColumnGrid>
                <InputWrapper>
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </InputWrapper>
                <Button type="submit">Criar</Button>
            </Form>
        </Modal>
    );
};