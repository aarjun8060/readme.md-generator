import Link from "next/link";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "../ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji';
import { SectionTemplates } from "@/types/dashboard";
import MarkDownEditor from "../dashboard/editor";
interface DocPreviewProps {
    templates: SectionTemplates[],
    selectedSlug: SectionTemplates,
    setTemplates: (val: SectionTemplates[]) => void;
}
const DocPreview = ({
    templates,
    selectedSlug,
    setTemplates
}: DocPreviewProps) => {
    console.log('selected',selectedSlug)
    return (
        <div className="w-full">
            <Tabs defaultValue="code" className="!w-[100%] min-h-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value='code' className="!w-full">
                    <div className="p-3">
                        <MarkDownEditor
                            templates={templates}
                            setTemplates={setTemplates}
                            focusedSelectionSlug={selectedSlug.slug}
                            height={"200px"}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="preview" className="!w-full">
                    <div className="w-full prose max-w-full ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm,remarkEmoji]}
                            components={{
                                a: ({ node, ...props }) => (
                                    <Link href={props.href!} target="__blank">
                                        {props.children}
                                    </Link>
                                ),
                                sup: ({ node, ...props }) => <sup>{props.children}</sup>,
                                sub: ({ node, ...props }) => <sub>{props.children}</sub>,
                            }}
                             
                        >{selectedSlug?.markdown}</ReactMarkdown>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default DocPreview;