'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const inputFields = [
    { label: 'Title', name: 'title', type: 'text', required: true },
    { label: 'Price', name: 'price', type: 'number', required: true },
    { label: 'Bedrooms', name: 'bedrooms', type: 'number', required: true },
    { label: 'Bathrooms', name: 'bathrooms', type: 'number', required: true },
    { label: 'Area (m²)', name: 'area', type: 'number', required: true },
    { label: 'Property Type', name: 'propertyType', type: 'text', required: true },
    { label: 'Country', name: 'country', type: 'text', required: true },
    { label: 'City', name: 'city', type: 'text', required: true },
    { label: 'District', name: 'district', type: 'text', required: true },
];

export default function CreatePropertyPage() {
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
        images: ['', '', '', ''],
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const imageMatch = name.match(/^images\[(\d+)\]$/);
        if (imageMatch) {
            const index = parseInt(imageMatch[1]);
            const newImages = [...formData.images];
            newImages[index] = value;
            setFormData({ ...formData, images: newImages });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_BASE_URL }/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
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
            }),
        });

        if (res.ok) {
            router.push('/admin/properties');
        } else {
            alert('Something went wrong!');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Property</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={ handleSubmit } className="grid gap-4">
                        { inputFields.map(({ label, name, type, required }) => (
                            <div key={ name } className="grid gap-1">
                                <Label htmlFor={ name }>{ label }
                                    { required && <span className='text-red-500'>*</span>
                                    } </Label>
                                <Input
                                    id={ name }
                                    name={ name }
                                    type={ type }
                                    value={ (formData as any)[name] }
                                    onChange={ handleChange }
                                    required={ required }
                                />
                            </div>
                        )) }

                        <div className="grid gap-1">
                            <Label>
                                Property Images
                                <span className='text-red-500'>*</span>
                            </Label>
                            { formData.images.map((image, index) => (
                                <Input
                                    key={ index }
                                    type="url"
                                    name={ `images[${ index }]` }
                                    placeholder={ `Image URL ${ index + 1 }` }
                                    value={ image }
                                    onChange={ handleChange }
                                />
                            )) }
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="description">
                                Description
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={ formData.description }
                                onChange={ handleChange }
                            />
                        </div>

                        <Button type="submit" className="mt-4 w-full">
                            Create Property
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
