"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ReduxProvider } from "./redux-provider";
import { initialSubscription } from "./slices/subscriptions";
import { initialDocuments } from "./slices/documents";
import { initialize_user } from "./slices/user";
import { Document, Subscription, User } from "@/generated/prisma/client";

interface Props {
  children: React.ReactNode;
  subscriptions: Subscription[];
  documents: Document[];
  user: Partial<User>;
}

export default function ReduxProviderWithInit({
  children,
  subscriptions,
  documents,
  user,
}: Props) {
  return (
    <ReduxProvider>
      <ReduxInitializer
        subscriptionsData={subscriptions}
        documentsData={documents}
        userData={user}
      />
      {children}
    </ReduxProvider>
  );
}

function ReduxInitializer({
  subscriptionsData,
  documentsData,
  userData,
}: {
  subscriptionsData: Props["subscriptions"];
  documentsData: Props["documents"];
  userData: Props["user"];
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (subscriptionsData) {
      dispatch(initialSubscription(subscriptionsData));
      dispatch(initialDocuments(documentsData));
      dispatch(initialize_user(userData));
    }
  }, [dispatch, subscriptionsData, documentsData, userData]);

  return null;
}
