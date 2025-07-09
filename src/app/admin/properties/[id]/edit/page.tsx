// app/admin/properties/[id]/edit/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function EditPropertyPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        propertyType: '',
        country: '',
        city: '',
        district: '',
        description: '',
        images: ['', '', '', ''],
    });

    useEffect(() => {
        const fetchProperty = async () => {
            const res = await fetch(`${ process.env.NEXT_PUBLIC_API_BASE_URL }/properties/${ id }`);
            const property = await res.json();

            setFormData({
                title: property.title || '',
                price: property.price || '',
                bedrooms: property.bedrooms || '',
                bathrooms: property.bathrooms || '',
                area: property.area || '',
                propertyType: property.propertyType || '',
                country: property.location?.country || '',
                city: property.location?.city || '',
                district: property.location?.district || '',
                description: property.description || '',
                images: property.images || ['', '', '', ''],
            });
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name.startsWith('images')) {
            const index = parseInt(name.split('[')[1]);
            const newImages = [...formData.images];
            newImages[index] = value;
            setFormData({ ...formData, images: newImages });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            area: Number(formData.area),
            price: Number(formData.price),
            location: {
                country: formData.country,
                city: formData.city,
                district: formData.district,
            },
        };

        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_BASE_URL }/properties/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (res.ok) {
            router.push('/admin/properties');
        } else {
            alert('Something went wrong');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Property</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={ handleSubmit } className="grid gap-4">
                        { [
                            ['Title', 'title'],
                            ['Price', 'price'],
                            ['Bedrooms', 'bedrooms'],
                            ['Bathrooms', 'bathrooms'],
                            ['Area', 'area'],
                            ['Property Type', 'propertyType'],
                            ['Country', 'country'],
                            ['City', 'city'],
                            ['District', 'district'],
                        ].map(([label, name]) => (
                            <div key={ name }>
                                <Label htmlFor={ name }>{ label }</Label>
                                <Input id={ name } name={ name } value={ (formData as any)[name] } onChange={ handleChange } required />
                            </div>
                        )) }

                        { [0, 1, 2, 3].map((i) => (
                            <div key={ `images[${ i }]` }>
                                <Label htmlFor={ `images[${ i }]` }>Image URL { i + 1 }</Label>
                                <Input
                                    id={ `images[${ i }]` }
                                    name={ `images[${ i }]` }
                                    value={ formData.images[i] || '' }
                                    onChange={ handleChange }
                                />
                            </div>
                        )) }

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea name="description" value={ formData.description } onChange={ handleChange } required />
                        </div>

                        <Button type="submit" className="w-full mt-4">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
