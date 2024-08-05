import Link from "next/link";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "../ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { Textarea } from "../ui/textarea";

const EditorPreview = ({
    selectedSectionSlugs,
    getTemplate
}) => {
    selectedSectionSlugs = [...new Set(selectedSectionSlugs)];

    const markdown =  selectedSectionSlugs && selectedSectionSlugs.length>0 ?  selectedSectionSlugs.reduce((acc,section) => {
    const template = getTemplate(section);
    if (template) {
      return `${acc}${template?.markdown}`;
    } else {
      return acc;
    }
    },``) : ''
    return (
        <Tabs defaultValue="preview" className="w-[96%] min-h-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw Data</TabsTrigger>
            </TabsList>
            <TabsContent value='preview'>
                <div className="px-3 pt-5">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        a: ({node, ...props}) => (
                            <Link href={props.href!} target="__blank">
                                {props.children}
                            </Link>
                        ),
                    }}
                >{markdown}</ReactMarkdown>
                </div>
            </TabsContent>
            <TabsContent value="raw">
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