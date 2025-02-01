import { AddTaskShortcut } from "@/components/addTaskShortCut/AddTaskShortcut";
import { DashboardHeader } from "@/components/header/DashboardHeader";
import InviteUsers from "@/components/inviteUsers/InviteUsers";
import {
  getUserWorkspaceRole,
  getWorkspace,
  
} from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { Settings2 } from "lucide-react";
import { notFound } from "next/navigation";

interface Params {
  params: {
    workspace_id: string;
  };
}

const Workspace = async ({ params: { workspace_id } }: Params) => {
  const session = await checkIfUserCompletedOnboarding(
    `/dashboard/workspace/${workspace_id}`
  );

  const [workspace, userRole] = await Promise.all([
    // getWorkspaceWithChatId(workspace_id, session.user.id),
    getWorkspace(workspace_id,session.user.id),
    getUserWorkspaceRole(workspace_id, session.user.id),
  ]);

  if (!workspace || !userRole) notFound();

  return (
    <>
   
      <DashboardHeader
        addManualRoutes={[
          {
            name: "DASHBOARD",
            href: "/dashboard",
            useTranslate: true,
          },
          {
            name: workspace.name,
            href: `/dashboard/workspace/${workspace_id}`,
          },
        ]}
      >
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        {userRole !== "OWNER" && <Settings2  />}
        <AddTaskShortcut userId={session.user.id} />
      </DashboardHeader>
      <main className="flex flex-col gap-2 w-full">
        {/* <ShortcutContainer workspace={workspace} userRole={userRole} /> */}
        {/* <FilterContainer sessionUserId={session.user.id} /> */}
      
      </main>
      </>
   
  );
};

export default Workspace;