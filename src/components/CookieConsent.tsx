"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X, Settings, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

type CookieCategory = {
  id: string;
  name: string;
  description: string;
  required: boolean;
};

type ConsentState = Record<string, boolean>;

const STORAGE_KEY = "adani-solar-cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentState>(() => {
    const defaults: ConsentState = {};
    siteConfig.cookies.categories.forEach((cat) => {
      defaults[cat.id] = cat.required;
    });
    return defaults;
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (consent: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    const allAccepted: ConsentState = {};
    siteConfig.cookies.categories.forEach((cat) => {
      allAccepted[cat.id] = true;
    });
    saveConsent(allAccepted);
  };

  const acceptNecessary = () => {
    const onlyNecessary: ConsentState = {};
    siteConfig.cookies.categories.forEach((cat) => {
      onlyNecessary[cat.id] = cat.required;
    });
    saveConsent(onlyNecessary);
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  const toggleCategory = (id: string, required: boolean) => {
    if (required) return;
    setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md z-[100]"
        >
          <div className="bg-white sm:rounded-xl rounded-t-xl shadow-2xl border border-border overflow-hidden">
            {!showPreferences ? (
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-2.5 mb-3">
                  <Shield className="w-5 h-5 text-solar-green shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground mb-1">
                      Cookie Preferences
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We use cookies to enhance your experience and analyze traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={acceptAll}
                    size="sm"
                    className="bg-solar-green hover:bg-solar-green-dark text-white rounded-lg text-xs font-semibold h-8"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={acceptNecessary}
                    variant="outline"
                    size="sm"
                    className="rounded-lg text-xs font-semibold h-8"
                  >
                    Necessary Only
                  </Button>
                  <Button
                    onClick={() => setShowPreferences(true)}
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-xs font-semibold h-8 gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground">
                    Cookie Settings
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto custom-scrollbar">
                  {siteConfig.cookies.categories.map(
                    (category: CookieCategory) => (
                      <div
                        key={category.id}
                        className="flex items-start justify-between gap-3 pb-3 border-b border-border last:border-0"
                      >
                        <div className="flex-1">
                          <p className="text-xs font-medium text-foreground">
                            {category.name}
                            {category.required && (
                              <span className="ml-1.5 text-[10px] text-solar-green">
                                (Required)
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {category.description}
                          </p>
                        </div>
                        <Switch
                          checked={preferences[category.id] ?? category.required}
                          onCheckedChange={() =>
                            toggleCategory(category.id, category.required)
                          }
                          disabled={category.required}
                          className="shrink-0"
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={savePreferences}
                    size="sm"
                    className="bg-solar-green hover:bg-solar-green-dark text-white rounded-lg text-xs font-semibold h-8"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={acceptAll}
                    variant="outline"
                    size="sm"
                    className="rounded-lg text-xs font-semibold h-8"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
