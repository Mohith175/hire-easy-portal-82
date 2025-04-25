
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { JobCategory, getJobCategories, createJobCategory, updateJobCategory, deleteJobCategory } from "@/services/jobService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
  PlusCircle,
  Edit,
  Trash2,
  Tag,
  AlertTriangle
} from "lucide-react";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);
  
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
  });
  
  const [editedCategory, setEditedCategory] = useState({
    id: "",
    title: "",
    description: "",
  });
  
  const queryClient = useQueryClient();
  
  // Fetch categories
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getJobCategories
  });
  
  // Create category mutation
  const createMutation = useMutation({
    mutationFn: createJobCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobCategories'] });
      toast({
        title: "Category created",
        description: "Job category has been created successfully.",
      });
      setNewCategory({ title: "", description: "" });
      setIsCreateDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to create category",
        description: "There was an error creating the job category.",
        variant: "destructive",
      });
    }
  });
  
  // Update category mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, category }: { id: string, category: Partial<JobCategory> }) => 
      updateJobCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobCategories'] });
      toast({
        title: "Category updated",
        description: "Job category has been updated successfully.",
      });
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to update category",
        description: "There was an error updating the job category.",
        variant: "destructive",
      });
    }
  });
  
  // Delete category mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteJobCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobCategories'] });
      toast({
        title: "Category deleted",
        description: "Job category has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete category",
        description: "There was an error deleting the job category.",
        variant: "destructive",
      });
    }
  });
  
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newCategory);
  };
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ 
      id: editedCategory.id, 
      category: { 
        title: editedCategory.title, 
        description: editedCategory.description 
      } 
    });
  };
  
  const handleDeleteSubmit = () => {
    if (selectedCategory) {
      deleteMutation.mutate(selectedCategory.id);
    }
  };
  
  const openEditDialog = (category: JobCategory) => {
    setEditedCategory({
      id: category.id,
      title: category.title,
      description: category.description,
    });
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (category: JobCategory) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };
  
  const filteredCategories = categories?.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Job Categories</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <PlusCircle size={18} className="mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 rounded-full border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Tag className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-900">No categories found</p>
              <p className="text-gray-500 mt-1">Try adjusting your search or add a new category</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Job Categories</CardTitle>
              <CardDescription>
                Manage job categories for your portal. Categories help job seekers find relevant positions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.title}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(category)}>
                              <Edit size={16} className="mr-2" />
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(category)}>
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Create Category Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Job Category</DialogTitle>
              <DialogDescription>
                Create a new job category to help organize job listings.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Category Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Software Development"
                    value={newCategory.title}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of this job category..."
                    value={newCategory.description}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Creating..." : "Create Category"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Edit Category Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Job Category</DialogTitle>
              <DialogDescription>
                Update the details of this job category.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Category Title</Label>
                  <Input
                    id="edit-title"
                    value={editedCategory.title}
                    onChange={(e) => setEditedCategory(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editedCategory.description}
                    onChange={(e) => setEditedCategory(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Category Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center text-destructive">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Delete Category
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this category? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedCategory && (
                <div className="border rounded p-4 bg-gray-50">
                  <p className="font-medium">{selectedCategory.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedCategory.description}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleDeleteSubmit}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete Category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
