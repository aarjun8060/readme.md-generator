import { useMemo } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
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
  SortableContext,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import CustomSection from "./custom-section";
import Sortableitems from "./sortable-items";
import { toast } from "sonner";

const SideBar = ({
  defaultOpen,
  selectedSectionSlugs,
  setSelectedSectionSlugs,
  sectionSlugs,
  setSectionSlugs,
  setFocusedSectionSlug,
  focusedSelectionSlug,
  templates,
  originalTemplate,
  setTemplates,
  getTemplate,
  pageRefreshed,
  slugsFromPreviousSession,
  addAction,
  setAction,
  setPageRefreshed
}: any) => {
  console.log('focusedSelectionSlug',focusedSelectionSlug)
  let alphabetizedSectionSlugs = sectionSlugs.sort();
  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  )

  const onAddSection = (e,section) => {
    console.log('hello Add section fun')
    localStorage.setItem('current-focused-slug',section);
    setPageRefreshed(false);
    setAction(true);
    setSectionSlugs((prev) => prev.filter((s) => s !== section));
    setSelectedSectionSlugs((prev) => [...prev,section]);
    setFocusedSectionSlug(localStorage.getItem('current-focused-slug'));
    toast.success('Add section successfully!')
  } 
  return (
    <Sheet
      modal={true}
      {...openState}
    >
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 md:!hidden flex border border-white"
      >
        <Button
          variant="outline"
          size={'icon'}
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side={'left'}
        className={cn(
          'bg-background/80 backdrop-blur-xl top-0 border-r-[1px] p-6 border border-white',
          {
            'hidden md:inline-block w-[300px]': defaultOpen,
            'inline-block md:hidden w-full': !defaultOpen,
          }
        )}
      >
        <div>
          <AspectRatio ratio={16 / 2}>
            <Image
              src={""}
              // src={sidebarLogo}
              alt="Sidebar Logo"
              fill
              className="rounded-md object-contain"
            />

          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-full my-4 flex items-center justify-between py-8"
                variant="ghost"
              >
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">
                    Arjun
                    <span className="text-muted-foreground">
                      Noida
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
          <p className="text-muted-foreground text-xs mb-1">Selected Section</p>
          <Separator className="mb-4" />
          <Command>
            <CommandGroup className="">
              <CommandItem
                className="md:w-[320px] w-11/12 flex flex-col"
              //   onClick={(e) => onAddSection(e, s)}
              >
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={() => { }}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext items={selectedSectionSlugs}>
                    {
                      (pageRefreshed || addAction
                        ? (selectedSectionSlugs = [...new Set(selectedSectionSlugs)])
                        : "",
                        selectedSectionSlugs.map((s) => {
                          const template = getTemplate(s);
                          if (template) {
                            return (
                              <ScrollArea className=" ml-1 w-[320px] flex flex-col py-1" key={s}>
                              <Sortableitems
                                
                                id={s}
                                section={template}
                                focusedSelectionSlug={focusedSelectionSlug}
                                setFocusedSectionSlug={setFocusedSectionSlug}
                                // onDeleteSection={onDeleteSection}
                                onDeleteSection={() => {}}
                                // onResetSection={onResetSection}
                                onResetSection={() => {}}
                              />
                              </ScrollArea>
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
                      setSelectedSectionSlugs={setSelectedSectionSlugs}
                      setFocusedSectionSlug={setFocusedSectionSlug}
                      setPageRefreshed={setPageRefreshed}
                      setAddAction={setAction}
                      setTemplates={setTemplates}
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
              <CommandList className="py-4 ">
                <CommandEmpty>No Results Found</CommandEmpty>

                <CommandGroup className="">
                  <ScrollArea className="!w-full !min-h-fit">
                    {
                      (pageRefreshed &&
                        slugsFromPreviousSession.indexOf("title-and-description") == -1
                        ? sectionSlugs.push("title-and-description")
                        : "",
                        alphabetizedSectionSlugs.map((s: any) => {
                          const template = getTemplate(s);
                          if (template) {
                            return (
                              <CommandItem
                                key={s}
                                className="md:w-[320px] w-full"
                                
                              >
                                <div
                                onClick={(e) => onAddSection(e, s)}
                                  className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                                >{template.name}</div>
                              </CommandItem>
                            );
                          }
                        }))
                    }
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;