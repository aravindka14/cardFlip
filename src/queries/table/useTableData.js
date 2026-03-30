import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { interceptor } from "../interceptor";

export const useTableData = () => {
  const useGetTableData = () => {
    return useQuery({
      queryKey: ["tableData"],
      queryFn: () => interceptor.get("/users"),
    });
  };
  return {
    useGetTableData,
  };
};
