"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border-0 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-400 dark:hover:ring-blue-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 to-pink-500/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-500"></div>
      
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isDefault ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-300 dark:bg-gray-600'} shadow-lg`}></div>
            <CardTitle className="text-lg font-bold capitalize bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {name}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {isDefault && (
              <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-sm">
                Default
              </span>
            )}
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-600"
            />
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ${parseFloat(balance).toFixed(2)}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                {type.charAt(0) + type.slice(1).toLowerCase()} Account
              </p>
              <div className="flex items-center space-x-1">
                {balance >= 0 ? (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Positive</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Negative</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="relative z-10 pt-4">
          <div className="w-full flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Click to view details
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
