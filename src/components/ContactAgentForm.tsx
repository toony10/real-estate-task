'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactAgentForm() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    return (
        <Dialog open={ open } onOpenChange={ setOpen }>
            <DialogTrigger asChild>
                <Button variant="outline">Contact Agent</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                { !success ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Contact Agent</DialogTitle>
                            <DialogDescription>
                                Fill in the form below to contact the agent regarding this property.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={ handleSubmit } className="grid gap-4 mt-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Enter your name" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" placeholder="Enter your phone number" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="Enter your email" type="email" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="message" placeholder="Enter your message" />
                            </div>

                            <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={ loading }>
                                    { loading ? "Sending..." : "Send" }
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Success</DialogTitle>
                            <DialogDescription>
                                Your message has been sent to the agent!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                onClick={ () => {
                                    setSuccess(false);
                                    setOpen(false);
                                } }
                                className="w-full"
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </>
                ) }
            </DialogContent>
        </Dialog>
    );
}
