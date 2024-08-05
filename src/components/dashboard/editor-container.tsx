import { SectionTemplates } from "@/types/dashboard";
import MarkDownEditor from "./editor";
import EditorPreview from "./editor-preview";
interface EditorPreviewPageProps {
    focusedSelectionSlug:string | null;
    templates:SectionTemplates[];
    selectedSectionSlugs:string[];
    setTemplates: (val:SectionTemplates[]) => void;
    getTemplate:(val:string) => SectionTemplates | undefined;
}
const EditorPreviewPage = ({
    focusedSelectionSlug,
    templates,
    setTemplates,
    selectedSectionSlugs,
    getTemplate
}:EditorPreviewPageProps) => {
    return (
        <div className="flex w-full h-full space-x-3">
            <div className="w-2/3 border h-full">
                <MarkDownEditor
                    focusedSelectionSlug={focusedSelectionSlug}
                    templates={templates}
                    setTemplates={setTemplates}
                />
            </div>
            <div className="w-1/3 h-full">
                <EditorPreview
                    selectedSectionSlugs={selectedSectionSlugs}
                    getTemplate={getTemplate}
                />
            </div>
        </div>
    );
}
 
export default EditorPreviewPage;