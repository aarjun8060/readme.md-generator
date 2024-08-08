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
import { Textarea } from "../ui/textarea";
import { SectionTemplates } from "@/types/dashboard";
interface EditorPreviewProps {
    selectedSectionSlugs:string[];
    getTemplate:(val:string) => SectionTemplates | undefined;
}
const EditorPreview = ({
    selectedSectionSlugs,
    getTemplate
}: EditorPreviewProps) => {
    selectedSectionSlugs = [...new Set(selectedSectionSlugs)];

    const markdown = selectedSectionSlugs && selectedSectionSlugs.length > 0 ? selectedSectionSlugs.reduce((acc, section) => {
        const template = getTemplate(section);
        if (template) {
            return `${acc}${template?.markdown}`;
        } else {
            return acc;
        }
    }, ``) : ''
    return (
        <Tabs defaultValue="preview" className="w-[96%] min-h-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw Data</TabsTrigger>
            </TabsList>
            <TabsContent value='preview' className="min-h-[90vh]">
                <div className="p-3 prose prose-sm sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
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
                    >{markdown}</ReactMarkdown>
                </div>
            </TabsContent>
            <TabsContent value="raw" className="min-h-[90vh]">
                <Textarea
                    placeholder=""
                    readOnly
                    className="resize-none focus:outline w-full min-h-[90vh]"
                    value={markdown}
                />
            </TabsContent>
        </Tabs>
    );
}

export default EditorPreview;