import MarkDownEditor from "./editor";
import EditorPreview from "./editor-preview";

const EditorPreviewPage = ({
    focusedSelectionSlug,
    templates,
    setTemplates,
    selectedSectionSlugs,
    getTemplate
}) => {
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