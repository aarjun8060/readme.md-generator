'use client'
import { DownloadModal } from "@/components/dashboard/download-modal";
import EditorPreviewPage from "@/components/dashboard/editor-container";
import SectionColumn from "@/components/dashboard/section-column";
import { ModeToggle } from "@/components/global/mode-toggle";
import Navigation from "@/components/site/navigation";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/use-local-storage";
import useDeviceDetect from "@/hooks/use-mobile-detect";
import { cn } from "@/lib/utils";
import { sectionTemplates } from "@/providers/data/section-templates";
import { Download, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
interface SectionTemplatesInterface {
    slug: string;
    name: string;
    markdown: string;
}
const Editor = () => {
    const { isMobile } = useDeviceDetect();
    const [selectionSlugs, setSelectionSlugs] = useState(sectionTemplates.map((t) => t.slug));
    const [selectedSelectionSlugs, setSelectedSelectionSlugs] = useState<string[]>([]);
    const [focusedSelectionSlug, setFocusedSelectionSlug] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [templates, setTemplates] = useState(sectionTemplates);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const {
        backUp
    } = useLocalStorage();
    const toggleModal = () => setShowModal(prevState => !prevState);
    useEffect(() => {
        if (backUp) {
            setTemplates(backUp);
        }
    }, [backUp])

    const getTemplate = (slug: string) => {
        return templates.find((t) => t.slug === slug);
    }

    useEffect(() => {
        setFocusedSelectionSlug(null);
    }, [])

    useEffect(() => {
        let currentSlugList = localStorage.getItem('current-slug-list');
        if (
            currentSlugList?.indexOf('title_and_description') == -1 &&
            selectedSelectionSlugs.indexOf('title_and_description') > -1
        ) {
            selectedSelectionSlugs.splice(
                selectedSelectionSlugs.indexOf('title_and_description'), 1
            )
        }

        // setFocusedSelectionSlug(
        //     currentSlugList && currentSlugList.split(',')[0]
        // )

        localStorage.setItem('current-slug-list', JSON.stringify(selectedSelectionSlugs));
    }, [selectedSelectionSlugs])

    const onMenuClick = () => setShowDrawer(!showDrawer)
    const markdown =  selectedSelectionSlugs && selectedSelectionSlugs.length>0 ? selectedSelectionSlugs?.reduce((acc, section) => {
        console.log('acc',acc,'section',section)
        const template = getTemplate(section);
        if (template) {
          return `${acc}${template?.markdown}`;
        } else {
          return acc;
        }
      }, ``) : '';
    
      const downloadMarkDownFile = () => {
        const a = document.createElement('a');
        const blob = new Blob([markdown]);
        a.href = URL.createObjectURL(blob);
        a.download = 'README.md';
        a.click();
        if (isMobile && showDrawer) {
          onMenuClick();
        }
        setShowModal(true);
      }
    return (
        <div>
            {/* <Navigation
             selectedSectionSlugs={selectedSelectionSlugs}
             isDrawerOpen={showDrawer}
             setShowModal={setShowModal}
             getTemplate={getTemplate}
             onMenuClick={() => setShowDrawer(!showDrawer)}
            /> */}
            {showModal && <DownloadModal setShowModal={toggleModal} />}

            <div className="w-full flex h-full">
                <div className="w-1/5 h-full">
                    <SectionColumn
                    selectedSectionSlugs={selectedSelectionSlugs}
                    setSelectedSectionSlugs={setSelectedSelectionSlugs}
                    sectionSlugs={selectionSlugs}
                    setSectionSlugs={setSelectionSlugs}
                    setFocusedSectionSlug={setFocusedSelectionSlug}
                    focusedSelectionSlug={focusedSelectionSlug}
                    templates={templates}
                    originalTemplate={sectionTemplates}
                    setTemplates={setTemplates}
                    getTemplate={getTemplate}
                    /> 
                </div>
                <div className="w-4/5 flex flex-col h-full">
                    <div className="w-full flex justify-end px-4 py-1  shadow-lg border-b-1 mb-2">
                        <aside className="flex space-x-2 items-center py-1">

                            <Button variant={"destructive"} className="space-x-2 text-lg">
                                <RotateCcw /> Reset
                            </Button>
                            <div
                                onClick={downloadMarkDownFile}
                                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 text-nowrap flex items-center justify-center space-x-2"
                            >
                                <span><Download /></span><span>Download</span>
                            </div>

                            <ModeToggle />
                        </aside>
                    </div>
                    <div className="w-full h-full">
                        <EditorPreviewPage
                            selectedSectionSlugs={selectedSelectionSlugs}
                            // setSelectedSectionSlugs={setSelectedSelectionSlugs}
                            // sectionSlugs={selectionSlugs}
                            // setSectionSlugs={setSelectionSlugs}
                            // setFocusedSectionSlug={setFocusedSelectionSlug}
                            focusedSelectionSlug={focusedSelectionSlug}
                            templates={templates}
                             
                            // originalTemplate={sectionTemplates}
                            setTemplates={setTemplates}
                            getTemplate={getTemplate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editor;