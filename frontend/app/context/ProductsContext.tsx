'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
};

type ProductContextType = {
  products: Product[];
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<Product | null>;
  createProduct: (data: Partial<Product>) => Promise<Product | null>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  loading: boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    console.log('data:');
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (res.ok) {
        setProducts(data.data);
      } else {
        if (data.status === 401) {
          toast({
            title: 'Não autorizado!',
            description: 'Sua sessão expirou. Faça login novamente.',
            variant: 'destructive',
          });
          router.push('/login');
        }
        throw new Error(data.error || 'Erro ao buscar produtos');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no sistema';
      toast({ title: errorMessage, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast, router]);

  const fetchProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (res.ok) return data;
      throw new Error(data.error || 'Erro ao buscar produto');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no sistema';
      toast({ title: errorMessage, variant: 'destructive' });
      return null;
    }
  };

  const createProduct = async (data: Partial<Product>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const newProduct = await res.json();
      if (res.ok) {
        setProducts((prev) => [...prev, newProduct.data]);
        toast({
          title: 'Produto criado!',
          description: 'O produto foi criado com sucesso!',
          variant: 'success',
        });
        return newProduct;
      }
      throw new Error(newProduct.error || 'Erro ao criar produto');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no sistema';
      toast({ title: errorMessage, variant: 'destructive' });
      return null;
    }
  };

  const updateProduct = async (id: string, data: Partial<Product>) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      if (res.ok) {
        setProducts((prev) => prev.map((p) => (p.id === id ? updated.data : p)));
        toast({
          title: 'Produto editado!',
          description: 'O produto foi editado com sucesso!',
          variant: 'success',
        });
        return updated;
      }
      throw new Error(updated.error || 'Erro ao atualizar produto');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no sistema';
      toast({ title: errorMessage, variant: 'destructive' });
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return true;
      }
      throw new Error(data.error || 'Erro ao deletar produto');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no sistema';
      toast({ title: errorMessage, variant: 'destructive' });
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        fetchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de um ProductProvider');
  }
  return context;
};
