import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string; // ← com máscara
  category: string;
  stock: number;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm = ({
  product,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price.toFixed(2).replace('.', ','),
      });
    }
  }, [product]);

  const formatCurrency = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    const float = (parseFloat(numeric) / 100).toFixed(2);
    return float.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    if (field === 'price' && typeof value === 'string') {
      const formatted = formatCurrency(value);
      setFormData((prev) => ({
        ...prev,
        price: formatted,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericPrice = parseFloat(formData.price.replace(/\./g, '').replace(',', '.'));

    if (!formData.name.trim() || !formData.category.trim()) {
      toast({
        title: 'Erro de validação',
        description: 'Nome e categoria são obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    if (numericPrice <= 0 || isNaN(numericPrice)) {
      toast({
        title: 'Erro de validação',
        description: 'O preço deve ser maior que zero.',
        variant: 'destructive',
      });
      return;
    }

    const productToSubmit: Product = {
      ...formData,
      price: numericPrice,
    };

    onSubmit(productToSubmit);
  };

  return (
    <Card className='w-full max-w-2xl mx-auto shadow-lg border-0 bg-card/90 backdrop-blur-sm'>
      <CardHeader className='space-y-2'>
        <CardTitle className='text-2xl font-bold '>
          {product ? 'Editar Produto' : 'Novo Produto'}
        </CardTitle>
        <CardDescription className='text-muted-foreground'>
          {product
            ? 'Atualize as informações do produto'
            : 'Preencha os dados do novo produto'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-sm font-medium'>
                Nome do Produto *
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='Nome do produto'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className='h-11 bg-background/50 border-border/50 focus:border-primary transition-colors'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category' className='text-sm font-medium'>
                Categoria *
              </Label>
              <Input
                id='category'
                type='text'
                placeholder='Categoria do produto'
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
                className='h-11 bg-background/50 border-border/50 focus:border-primary transition-colors'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description' className='text-sm font-medium'>
              Descrição
            </Label>
            <Textarea
              id='description'
              placeholder='Descrição do produto'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className='min-h-[100px] bg-background/50 border-border/50 focus:border-primary transition-colors resize-none'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='price' className='text-sm font-medium'>
                Preço (R$) *
              </Label>
              <Input
                id='price'
                type='text'
                placeholder='0,00'
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
                className='h-11 bg-background/50 border-border/50 focus:border-primary transition-colors'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='stock' className='text-sm font-medium'>
                Estoque
              </Label>
              <Input
                id='stock'
                type='number'
                placeholder='0'
                min='0'
                value={formData.stock || ''}
                onChange={(e) =>
                  handleInputChange('stock', parseInt(e.target.value) || 0)
                }
                className='h-11 bg-background/50 border-border/50 focus:border-primary transition-colors'
              />
            </div>
          </div>

          <div className='flex gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              className='flex-1 h-11 border-border/50 hover:bg-muted/50 transition-colors'
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              className='flex-1 h-11 bg-primary hover:opacity-90 transition-opacity'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                  Salvando...
                </div>
              ) : product ? (
                'Atualizar'
              ) : (
                'Criar Produto'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
