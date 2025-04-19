
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Employer, getEmployers } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Mail,
  Phone,
  MapPin,
  PlusCircle,
  Briefcase
} from "lucide-react";

const ManageEmployers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: employers, isLoading, error, refetch } = useQuery({
    queryKey: ['employers'],
    queryFn: getEmployers
  });
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load employers",
        variant: "destructive",
      });
    }
  }, [error]);
  
  const filteredEmployers = employers?.filter(employer => 
    employer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employer.country.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Manage Employers</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Input
                placeholder="Search employers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <PlusCircle size={18} className="mr-2" />
              Add Employer
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 rounded-full border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredEmployers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-900">No employers found</p>
              <p className="text-gray-500 mt-1">Try adjusting your search or add a new employer</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Employers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployers.map((employer) => (
                      <TableRow key={employer.id}>
                        <TableCell className="font-medium">
                          {employer.firstName} {employer.lastName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Mail size={16} className="mr-2 text-gray-500" />
                            <span>{employer.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone size={16} className="mr-2 text-gray-500" />
                            <span>{employer.contactNum}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2 text-gray-500" />
                            <span>{employer.city}, {employer.country}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageEmployers;
