import { UseCase } from "@prisma/client";
import { Dispatch } from 'react';



// تعريف أنواع الإجراءات
export enum ActionType {
  CHANGE_SITE = "CHANGE_SITE",
  NAME = "NAME",
  SURNAME = "SURNAME",
  PROFILEIMAGE = "PROFILEIMAGE",
  USECASE = "USECASE",
  WORKSPACE_NAME = "WORKSPACE_NAME",
  WORKSPACE_IMAGE = "WORKSPACE_IMAGE",
}

// واجهة تعريف الإجراء
export interface Action {
  type: ActionType; // نوع الإجراء
  payload: string | number | UseCase | null ; // الحمولة (قد تكون null)
}

// واجهة تعريف حالة المخلل (reducer)
export interface OnboardingFormReducer {
  currentStep: 1 | 2 | 3 | 4; // الخطوة الحالية
  name?: string | null; // الاسم (اختياري)
  surname?: string | null; // اللقب (اختياري)
  profileImage?: string | null; // صورة الملف الشخصي (اختياري)
  useCase: UseCase | null; // حالة الاستخدام
  workspaceName: string | null; // اسم مساحة العمل
  workspaceImage?: string | null; 
  // صورة مساحة العمل (اختياري)
}

// واجهة تعريف سياق نموذج الإعداد
export interface OnboardingFormContext extends OnboardingFormReducer {
  dispatch: Dispatch<Action>; // دالة التوزيع (dispatch)
}