"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950/30 dark:to-indigo-950/20 border-0 ring-1 ring-gray-200 dark:ring-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-pink-500/10 rounded-full translate-y-16 -translate-x-16"></div>
      
      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              💰 Monthly Budget
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your spending for the default account
            </p>
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
        
        {isEditing && (
          <div className="flex items-center gap-3 mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="flex-1 border-2 focus:border-blue-400 dark:focus:border-blue-500"
              placeholder="Enter budget amount"
              autoFocus
              disabled={isLoading}
            />
            <Button
              onClick={handleUpdateBudget}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/20"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="relative z-10">
        {initialBudget ? (
          <div className="space-y-6">
            {/* Budget Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${initialBudget.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Total Budget
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ${currentExpenses.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Spent
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Budget Progress
                </span>
                <span className={`text-sm font-bold ${
                  percentUsed >= 90
                    ? "text-red-600 dark:text-red-400"
                    : percentUsed >= 75
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-green-600 dark:text-green-400"
                }`}>
                  {percentUsed.toFixed(1)}% used
                </span>
              </div>
              
              <div className="relative">
                <Progress
                  value={percentUsed}
                  className="h-3 bg-gray-200 dark:bg-gray-700"
                />
                <div className={`absolute inset-0 h-3 rounded-full transition-all duration-500 ${
                  percentUsed >= 90
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : percentUsed >= 75
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-500"
                }`} style={{ width: `${Math.min(percentUsed, 100)}%` }}></div>
              </div>
              
              {/* Remaining Budget */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Remaining: ${Math.max(0, initialBudget.amount - currentExpenses).toFixed(2)}
                </span>
                {percentUsed >= 90 && (
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    ⚠️ Budget nearly exceeded!
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Budget Set
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Set a monthly budget to track your spending
            </p>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Set Budget
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
