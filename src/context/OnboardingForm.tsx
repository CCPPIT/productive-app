"use client";

import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { UseCase } from "@prisma/client";
import { Session } from 'next-auth';

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
  payload: string | number | UseCase | null|undefined; // الحمولة (قد تكون null)
}

// واجهة تعريف حالة المخلل (reducer)
export interface OnboardingFormReducer {
  currentStep: 1 | 2 | 3 | 4; // الخطوة الحالية
  name?: string | null; // الاسم (اختياري)
  surname?: string | null; // اللقب (اختياري)
  profileImage?: string | null; // صورة الملف الشخصي (اختياري)
  useCase: UseCase | null; // حالة الاستخدام
  workspaceName: string | null; // اسم مساحة العمل
  workspaceImage?: string | null; // صورة مساحة العمل (اختياري)
}

// واجهة تعريف سياق نموذج الإعداد
export interface OnboardingFormContext extends OnboardingFormReducer {
  dispatch: Dispatch<Action>; // دالة التوزيع (dispatch)
}

// إنشاء سياق لنموذج الإعداد
export const OnboardingFormCtx = createContext<OnboardingFormContext | null>(null);

// دالة المخلل (reducer) لإدارة الحالة
const onboardingFormReducer = (state: OnboardingFormReducer, action: Action): OnboardingFormReducer => {
  switch (action.type) {
    case ActionType.CHANGE_SITE:
      return { ...state, currentStep: action.payload as 1 | 2 | 3 | 4 };
    case ActionType.NAME:
      return { ...state, name: action.payload as string };
    case ActionType.SURNAME:
      return { ...state, surname: action.payload as string };
    case ActionType.PROFILEIMAGE:
      return { ...state, profileImage: action.payload as string | null };
    case ActionType.USECASE:
      return { ...state, useCase: action.payload as UseCase };
    case ActionType.WORKSPACE_NAME:
      return { ...state, workspaceName: action.payload as string | null };
    case ActionType.WORKSPACE_IMAGE:
      return { ...state, workspaceImage: action.payload as string | null };
    default:
      return state; // إرجاع الحالة الحالية إذا لم يتطابق أي إجراء
  }
};

// الحالة الابتدائية لنموذج الإعداد
const initialFormState: OnboardingFormReducer = {
  currentStep: 1,
  name: null,
  surname: null,
  profileImage: null,
  useCase: null,
  workspaceName: null,
  workspaceImage: null,
};

// مكون الموفر لنموذج الإعداد
export const OnboardingFormProvider: React.FC<{ children: React.ReactNode ,session:Session}> = ({ children ,session}) => {
  const [state, dispatch] = useReducer(onboardingFormReducer, {
    ...initialFormState,
    name: session.user.name,
    surname: session.user.surname,
    profileImage: session.user.image,
  });

  return (
    <OnboardingFormCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </OnboardingFormCtx.Provider>
  );
};

// هوك لاستخدام نموذج الإعداد
export const useOnboardingForm = (): OnboardingFormContext => {
  const ctx = useContext(OnboardingFormCtx);
  if (!ctx) {
    throw new Error("Invalid use of OnboardingFormContext. Ensure the component is wrapped in OnboardingFormProvider.");
  }
  return ctx; // إرجاع السياق
};