import useLocalStorage from "@/hooks/use-local-storage";
import { useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { SectionTemplates } from "@/types/dashboard";
interface CustomSectionProps {
    addSelectedSectionSlug:(val:string) => void; 
    setAddAction:(val:boolean)  => void; 
    setPageRefreshed:(val:boolean)  => void; 
    setFocusedSectionSlug:(val:string | null) => void;
    addTemplates:(val:SectionTemplates) => void;
}
const CustomSection = ({
    addTemplates,
    setFocusedSectionSlug,
    setPageRefreshed,
    setAddAction,
    addSelectedSectionSlug
}:CustomSectionProps) => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const { saveBackUp } = useLocalStorage();

    const addCustomSection = () => {
        const section = {
            slug: `custom`+ title.toLocaleLowerCase().replace('/\s/g','-'),
            name:title,
            markdown: `## ${title} ` 
        }

        localStorage.setItem('current-focused-slug',section.slug);
        // setTemplates((prev) => {
        //     const newTemplate = [...prev,section];
        //     saveBackUp(newTemplate)
        //     return newTemplate;
        // })
        addTemplates(section);
        setPageRefreshed(false);
        setAddAction(true);
        // setSelectedSectionSlugs((prev) => [...prev,section?.slug]);(
        addSelectedSectionSlug(section.slug)
        
        setFocusedSectionSlug(localStorage.getItem('current-focused-slug'));

        setShowModal(false)
        toast.success('Add your custome Section!');
    }
    return (
        <div className="w-[75%]">
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild className="w-full">
                    <Button variant="outline" className="!w-full text-muted-foreground"><Plus/>Custom Section</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Custom Section</DialogTitle>
                        <DialogDescription>
                            Add your custom section by adding name of section.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right text-nowrap">
                                Section Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                         
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={addCustomSection}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CustomSection;