'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ProductForm, { Product } from '@/components/ProductForm';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import Image from 'next/image';

const HomePage = () => {
  const {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    products,
    loading: productsLoading,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { toast } = useToast();
  const { logout } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const handleLogout = async () => {
    await logout();
  };

  const handleCreateProduct = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({
        title: 'Produto excluído',
        description: 'O produto foi removido com sucesso.',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao excluir o produto.',
      });
    }
  };

  const handleFormSubmit = async (productData: Product) => {
    setFormLoading(true);

    try {
      if (selectedProduct && selectedProduct.id) {
        await updateProduct(selectedProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      setIsFormOpen(false);
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o produto.',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedProduct(undefined);
  };

  const getStockColor = (stock: number) => {
    if (stock <= 5) return 'destructive';
    if (stock <= 15) return 'warning';
    return 'success';
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-muted to-background'>
      {/* Header */}
      <header className='bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-15 h-15 border rounded-xl flex items-center justify-center p-2'>
              <Image
                src={'/logo.png'}
                alt='Logo'
                width={32}
                height={32}
                className='w-full h-full object-contain'
              />
            </div>
            <div>
              <h1 className='text-xl font-bold'>Gerenciador de Produtos</h1>
              <p className='text-sm text-muted-foreground'>
                Gerencie seus produtos facilmente
              </p>
            </div>
          </div>
          <Button
            variant='outline'
            onClick={handleLogout}
            className='border-border/50 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-colors'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div>
            <h2 className='text-3xl font-bold mb-2'>Produtos</h2>
            <p className='text-muted-foreground'>
              Total de {products.length} produto{products.length !== 1 ? 's' : ''}{' '}
              cadastrado{products.length !== 1 ? 's' : ''}
            </p>
          </div>

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleCreateProduct}
                className='bg-primary hover:opacity-90 transition-opacity'
              >
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4v16m8-8H4'
                  />
                </svg>
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-4xl max-h-[90vh] overflow-auto border-0 bg-transparent shadow-none p-0'>
              <ProductForm
                product={selectedProduct}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isLoading={formLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {productsLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className='animate-pulse flex flex-col gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 shadow-sm'
                >
                  <div className='flex justify-between items-center'>
                    <div className='h-4 w-24 bg-muted rounded' />
                    <div className='h-4 w-16 bg-muted rounded' />
                  </div>
                  <div className='h-6 bg-muted rounded w-3/4' />
                  <div className='h-4 bg-muted rounded w-5/6' />
                  <div className='h-8 bg-muted rounded w-1/2 mt-4' />
                  <div className='flex gap-2 mt-2'>
                    <div className='h-8 w-full bg-muted rounded' />
                    <div className='h-8 w-full bg-muted rounded' />
                  </div>
                </div>
              ))
            : products.map((product) => (
                <Card
                  key={product.id}
                  className='group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:scale-[1.02]'
                >
                  <CardHeader className='space-y-3'>
                    <div className='flex items-start justify-between'>
                      <Badge variant='secondary' className='text-xs'>
                        {product.category}
                      </Badge>
                      <Badge variant={getStockColor(product.stock)} className='text-xs'>
                        {product.stock} em estoque
                      </Badge>
                    </div>
                    <CardTitle className='text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors'>
                      {product.name}
                    </CardTitle>
                    <CardDescription className='line-clamp-3 text-sm'>
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='text-2xl font-bold'>
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </div>

                    <div className='flex gap-2'>
                      <Dialog
                        open={isFormOpen && selectedProduct?.id === product.id}
                        onOpenChange={(open) => {
                          if (!open) setIsFormOpen(false);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleEditProduct(product)}
                            className='flex-1 border-border/50 hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors'
                          >
                            <svg
                              className='w-4 h-4 mr-1'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                              />
                            </svg>
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-4xl max-h-[90vh] overflow-auto border-0 bg-transparent shadow-none p-0'>
                          <ProductForm
                            product={selectedProduct}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                            isLoading={formLoading}
                          />
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex-1 border-border/50 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-colors'
                          >
                            <svg
                              className='w-4 h-4 mr-1'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                              />
                            </svg>
                            Excluir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Tem certeza que deseja excluir?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa ação não pode ser desfeita. Isso excluirá
                              permanentemente o produto do sistema.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProduct(product.id!)}
                              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                            >
                              Confirmar exclusão
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {!productsLoading && products.length === 0 && (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-muted-foreground'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold mb-2'>Nenhum produto encontrado</h3>
            <p className='text-muted-foreground mb-4'>
              Comece criando seu primeiro produto.
            </p>
            <Button
              onClick={handleCreateProduct}
              className='hover:opacity-90 transition-opacity'
            >
              Criar Primeiro Produto
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
