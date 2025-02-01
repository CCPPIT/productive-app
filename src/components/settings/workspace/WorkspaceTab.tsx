import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsWorkspace } from "@/types/extended";
import { Layers, Users2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EditWorkspaceCard from "./overview/Edit/EditWorkspaceCard";
import DeleteWorkspace from "./overview/DeleteWorkspace";
import MembersCard from "./members/MembersCard";
import { useTranslations } from "next-intl";

interface Props {
  workspace: SettingsWorkspace;
  workspaceId: string;
}

export const WorkspaceTab = ({ workspace, workspaceId }: Props) => {
  const t=useTranslations("COMMON")
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-6">
        <TabsTrigger value="overview" className="mr-2 flex items-center gap-2">
          <Layers size={18} />
          {t("OVERVIEW")}
        
        </TabsTrigger>
        <TabsTrigger value="members" className="mr-2 flex items-center gap-2">
          <Users2 size={18} />
          {t("MEMBERS")}
         
        </TabsTrigger>
      </TabsList>
      <TabsContent tabIndex={1} value="overview">
        <EditWorkspaceCard workspace={workspace} />
        <div className="py-4 smLpy-6">
          <Separator />
        </div>
        <DeleteWorkspace workspace={workspace} />
      </TabsContent>
      <TabsContent value="members">
        <MembersCard workspace={workspace} workspaceId={workspaceId} />
      </TabsContent>
    </Tabs>
  );
};