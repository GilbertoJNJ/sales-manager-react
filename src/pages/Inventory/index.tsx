import { useEffect, useState } from "react";
import Background from "../../components/Background";
import NavigateBar from "../../components/NavigateBar";
import axios from "axios";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Category, Product } from "../../types/product.model";
import Title from "../../components/Title";
import Conteiner from "../../components/Conteiner";
import authenticateStore from "../../store/authenticate.store";
import CreateProductModal from "../../components/Modal/CreateProduct";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "../../components/Table";

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  background-color: #87ceeb;
  color: white;
  border-radius: 4px;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #4682b4;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  color: #87ceeb;
  cursor: pointer;
  padding: 5px;
  &:hover {
    color: #4682b4;
  }
`;

const PaginationInfo = styled.span`
  margin: 0 10px;
`;

const ItemsPerPageSelect = styled.select`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalElements, setTotalElements] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const { user } = authenticateStore;

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/products', {
          headers: { Authorization: `Bearer ${user.token}` },
          params: {
            pageNumber: currentPage - 1,
            pageSize: itemsPerPage,
            search: searchTerm || null,
            categories: categories.length > 0 ? categories.join(',') : null,
          },
        });
        const { content, number, totalElements, totalPages } = response.data;

        setProducts(content);
        setCurrentPage(number + 1);
        setTotalElements(totalElements);
        setTotalPages(totalPages)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, searchTerm, categories]);

  return (
    <>
      <NavigateBar />
      <Background>
        <Title>Lista de Produtos</Title>
        <Conteiner>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Buscar por ID ou nome"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FilterButton onClick={() => setCategories(categories)}>
              <FontAwesomeIcon icon={faFilter} />
            </FilterButton>
            <AddButton onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} />
            </AddButton>
          </SearchBar>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Categoria</TableHeader>
                <TableHeader>Preço</TableHeader>
                <TableHeader>Quantidade em Estoque</TableHeader>
                <TableHeader>Ação</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(product.unitPrice)}
                  </TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <PaginationContainer>
            <PaginationInfo>
              Total de Itens: {totalElements}
            </PaginationInfo>
            <Section>
              <PaginationInfo>
                Itens por página:
              </PaginationInfo>
              <ItemsPerPageSelect
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </ItemsPerPageSelect>
            </Section>
            <Section>
              <PaginationButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </PaginationButton>
              <PaginationInfo>
                Página {currentPage} de {totalPages}
              </PaginationInfo>
              <PaginationButton
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </PaginationButton>
            </Section>
          </PaginationContainer>
        </Conteiner>
      </Background>
      <CreateProductModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </>
  );
};