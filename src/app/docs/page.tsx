'use client'
import DocPreview from "@/components/docs/preview";
import { Separator } from "@/components/ui/separator";
import { SectionTemplates } from "@/types/dashboard";
import { useState } from "react";
import {
    sectionTemplates
} from '@/providers/data/docs-template';

const DocPage = () => {
    const [templates, setTemplates] = useState<SectionTemplates[]>(sectionTemplates);
    return (
        <div className="bg-background w-full h-full flex flex-col justify-center items-center gap-y-3">
            {
                templates && templates.map((template,i:number) => (
                    <div className="w-11/12 flex flex-col space-y-4 h-fit" key={i}>
                        <h1 className="text-2xl font-bold">{template.name}</h1>
                        <Separator />
                        <div className="w-full">
                        <DocPreview
                            templates={templates}
                            setTemplates={setTemplates}
                            selectedSlug = {template}
                        />
                        </div>
                    </div>
                ))
            }

        </div>
    );
}

export default DocPage;