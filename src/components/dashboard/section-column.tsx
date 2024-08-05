import { DragEvent, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import useLocalStorage from "@/hooks/use-local-storage";
import { 
    ChevronsUpDown, 
    Compass 
} from "lucide-react";
import {
    Popover, 
    PopoverTrigger 
} from "../ui/popover";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import { 
    restrictToVerticalAxis 
} from "@dnd-kit/modifiers";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "../ui/command";
import CustomSection from "./custom-section";
import Sortableitems from "./sortable-items";
import { SectionTemplates } from "@/types/dashboard";
interface SectionColumProps {
    selectedSectionSlugs:string[];
    setSelectedSectionSlugs:(val:string[]) => void;
    sectionSlugs:string[];
    focusedSelectionSlug:string | null;
    setFocusedSectionSlug:(val:string|null) => void;
    setTemplates: (val:SectionTemplates[]) => void;
    getTemplate:(val:string) => SectionTemplates | undefined;
    filterSelectedSectionSlugs: (val:string)=> void;
    filterSectionSlugs:(val:string) =>void;
    addSelectedSectionSlug:(val:string) => void; 
    addSectionSlug:(val:string) =>void;
    handleDragEnd:(val:any) => void;
    addTemplates:(val:SectionTemplates) => void;
}
const SectionColumn = ({
    selectedSectionSlugs,
    setSelectedSectionSlugs,
    sectionSlugs,
    setFocusedSectionSlug,
    focusedSelectionSlug,
    setTemplates,
    getTemplate,
    filterSelectedSectionSlugs,
    filterSectionSlugs,
    addSelectedSectionSlug,
    addSectionSlug,
    handleDragEnd,
    addTemplates
}:SectionColumProps) => {
    const [pageRefreshed, setPageRefreshed] = useState<boolean>(false);
    const [addAction, setAction] = useState<boolean>(false);
    const {
        saveBackUp,
        deleteBackUp,
    } = useLocalStorage();
    let alphabetizedSectionSlugs = sectionSlugs.sort();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        }),
        useSensor(TouchSensor)
    )

    const onAddSection = (e:React.MouseEvent<HTMLButtonElement>, section:string) => {
        console.log('hello Add section fun',section)
        localStorage.setItem('current-focused-slug', section);
        setFocusedSectionSlug(section);
        setPageRefreshed(false);
        setAction(true);
        // setSectionSlugs(prev => {
        //     return prev.filter(s => s !== section)
        // });
        filterSectionSlugs(section)
        // setSelectedSectionSlugs((prev:string[]) => [...prev, section]);
        addSelectedSectionSlug(section);
        toast.success('Add section successfully!')
    }

    console.log('focused',focusedSelectionSlug)
    const onDeleteSection = (e:React.MouseEvent<HTMLButtonElement>,sectionSlug:string) => {
        e.stopPropagation();
        // setSelectedSectionSlugs((prev) => prev && prev.filter((s) => s != sectionSlug));
        filterSelectedSectionSlugs(sectionSlug)

        // setSectionSlugs((prev:string[]) => [...prev,sectionSlug]);
        addSectionSlug(sectionSlug)
        setFocusedSectionSlug(null);
        localStorage.setItem("current-focused-slug", "noEdit");
        toast.success('Deleted Section Successfully!');
    }


    return (
        <ScrollArea className="h-[100vh]">
            {/* <AspectRatio ratio={16 / 2}>
                <Image
                    src={""}
                    // src={sidebarLogo}
                    alt="Sidebar Logo"
                    fill
                    className="rounded-md object-contain"
                />
            </AspectRatio> */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        className="w-full my-4 flex items-center justify-between py-8"
                        variant="ghost"
                    >
                        <div className="flex items-center text-left gap-2">
                            <Compass />
                            <div className="flex flex-col">
                                aarjun8060
                                <span className="text-muted-foreground">
                                    Developer
                                </span>
                            </div>
                        </div>
                        <div>
                            <ChevronsUpDown
                                size={16}
                                className="text-muted-foreground"
                            />
                        </div>
                    </Button>
                </PopoverTrigger>
            </Popover>
            <p className="text-muted-foreground  text-xs mb-1">Selected Section</p>
            <Separator className="mb-4" />
            <Command>
                <CommandGroup className="">
                    <CommandItem
                        className="md:w-[320px] w-11/12 flex flex-col"
                    >
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                            modifiers={[restrictToVerticalAxis]}
                        >
                            <SortableContext items={selectedSectionSlugs}>
                                {
                                    (pageRefreshed || addAction
                                        ? (selectedSectionSlugs = [...new Set(selectedSectionSlugs)])
                                        : "",
                                        selectedSectionSlugs.map((s) => {
                                            console.log('s',s)
                                            const template = getTemplate(s);
                                            console.log('template',template)
                                            if (template) {
                                                return (
                                                    <div className=" w-full h- flex flex-col py-1 " key={s}>
                                                        <Sortableitems
                                                            id={s}
                                                            section={template}
                                                            focusedSelectionSlug={focusedSelectionSlug}
                                                            setFocusedSectionSlug={setFocusedSectionSlug}
                                                            onDeleteSection={onDeleteSection}
                                                            onResetSection={() => { }}
                                                        />
                                                    </div>
                                                );
                                            }
                                        }))
                                }
                            </SortableContext>
                        </DndContext>
                    </CommandItem>
                </CommandGroup>
            </Command>
            <p className="text-muted-foreground text-xs my-1">Custom Add</p>
            <Separator className="mb-4" />
            <Command>
                <CommandGroup className="">
                    <CommandItem
                        className="md:w-[320px] w-full"
                    >
                        {sectionSlugs.length > 0 && (
                            <div
                                className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                            >
                                <CustomSection
                                    // setSelectedSectionSlugs={setSelectedSectionSlugs}
                                    setFocusedSectionSlug={setFocusedSectionSlug}
                                    setPageRefreshed={setPageRefreshed}
                                    setAddAction={setAction}
                                    addTemplates={addTemplates}
                                    addSelectedSectionSlug={addSelectedSectionSlug}
                                />
                            </div>
                        )}

                    </CommandItem>
                </CommandGroup>
            </Command>
            <p className="text-muted-foreground text-xs mt-3 mb-1">All Sections</p>
            <Separator className="mb-2" />
            <nav className="">
                <Command className="rounded-lg  bg-transparent">
                    <CommandInput placeholder="Search..." />
                    <CommandList className="py-1 ">
                        <CommandEmpty>No Results Found</CommandEmpty>

                        <CommandGroup className="">
                            <ScrollArea className="!w-full h-[300px]">
                                {
                                    ( 
                                        // pageRefreshed &&
                                        // slugsFromPreviousSession.indexOf("title-and-description") == -1
                                        // ? sectionSlugs.push("title-and-description")
                                        // : "",
                                        alphabetizedSectionSlugs.map((s:string) => {
                                            const template = getTemplate(s);
                                            if (template){
                                                return (
                                                    <CommandItem
                                                        key={s}
                                                        className="md:w-[320px] w-full"

                                                    >
                                                        <button
                                                            onClick={(e) => onAddSection(e, s)}
                                                            className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                                                        >{template.name}</button>
                                                    </CommandItem>
                                                );
                                            }
                                            return null;
                                        }))
                                }
                            </ScrollArea>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </nav>
        </ScrollArea>
    );
}

export default SectionColumn;