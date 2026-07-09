"use client";

import { useRouter } from "next/navigation";
import { PremiumPanel } from "./premiumPanel";
import { StandardPanel } from "./standardPanel";
import { useEffect, useState } from "react";
import { initFirebase } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "./stripePayment";
import { getPremiumStatus } from "./getPremiumStatus";
import "./page.css";

export default function AccountPage() {
  const app = initFirebase();
  const auth = getAuth(app);

  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  const upgradeToPremium = async () => {
    console.log("upgradeToPremium clicked");
    const priceId = "price_1Tr2AwKEL1w8MmxLYvedQHxw";
    console.log(priceId)
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    console.log("Checkout URL:", checkoutUrl);
    window.location.assign(checkoutUrl);
  };

  const manageSubscription = async () => {
    const portalUrl = await getPortalUrl(app);
    router.push(portalUrl);
  };

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  const upgradeToPremiumButton = (
    <button onClick={upgradeToPremium} className="account__btn">
      Upgrade To Premium
    </button>
  );

  const managePortalButton = (
    <button onClick={manageSubscription} className="account__btn">
      Manage Subscription
    </button>
  );

  const signOutButton = (
    <button onClick={signOut} className="account__signout--btn">
      Sign Out
    </button>
  );

  const accountSummary = (
    <div className="account__summary">
      <div className="account__username">Signed in as {userName}</div>
      <div className="account__email">{email}</div>
    </div>
  );

  const statusPanel = isPremium ? <PremiumPanel /> : <StandardPanel />;
  const memberButton = isPremium ? managePortalButton : upgradeToPremiumButton;

  return (
    <div className="account__page">
      <div className="account__wrapper">
        {accountSummary}
        {statusPanel}
        {memberButton}
        {signOutButton}
      </div>
    </div>
  );
}