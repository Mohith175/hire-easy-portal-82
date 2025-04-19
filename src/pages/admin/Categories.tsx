
import React, { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { 
  PencilIcon, 
  TrashIcon, 
  PlusCircleIcon,
  SearchIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Sample categories
const initialCategories = [
  { id: 1, title: "IT & Software", description: "Jobs related to information technology and software development.", jobCount: 152 },
  { id: 2, title: "Design", description: "Graphic design, UI/UX design, and other creative positions.", jobCount: 89 },
  { id: 3, title: "Marketing", description: "Digital marketing, content marketing, and SEO-related jobs.", jobCount: 73 },
  { id: 4, title: "Sales", description: "Sales representatives, account managers, and business development roles.", jobCount: 64 },
  { id: 5, title: "Customer Service", description: "Customer support and service-related positions.", jobCount: 51 },
  { id: 6, title: "Data Science", description: "Data analysis, machine learning, and AI-related positions.", jobCount: 47 },
  { id: 7, title: "Finance", description: "Accounting, financial analysis, and banking positions.", jobCount: 42 },
  { id: 8, title: "Human Resources", description: "HR management, recruitment, and talent acquisition roles.", jobCount: 38 },
  { id: 9, title: "Project Management", description: "Project managers, product managers, and Scrum masters.", jobCount: 36 },
  { id: 10, title: "Healthcare", description: "Nursing, medical, and healthcare-related positions.", jobCount: 28 },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ title: "", description: "" });

  const filteredCategories = categories.filter(
    category => 
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategory.title.trim()) {
      toast({
        title: "Error",
        description: "Category title is required.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...categories.map(c => c.id)) + 1;
    const categoryToAdd = {
      id: newId,
      title: newCategory.title,
      description: newCategory.description,
      jobCount: 0
    };

    setCategories([...categories, categoryToAdd]);
    setNewCategory({ title: "", description: "" });
    setIsAddDialogOpen(false);

    toast({
      title: "Category added",
      description: `The category "${newCategory.title}" has been added successfully.`,
    });
  };

  const handleEditCategory = () => {
    if (!currentCategory?.title.trim()) {
      toast({
        title: "Error",
        description: "Category title is required.",
        variant: "destructive",
      });
      return;
    }

    const updatedCategories = categories.map(category => 
      category.id === currentCategory.id ? currentCategory : category
    );

    setCategories(updatedCategories);
    setIsEditDialogOpen(false);

    toast({
      title: "Category updated",
      description: `The category "${currentCategory.title}" has been updated successfully.`,
    });
  };

  const handleDeleteCategory = (id: number) => {
    const categoryToDelete = categories.find(c => c.id === id);
    setCategories(categories.filter(category => category.id !== id));

    toast({
      title: "Category deleted",
      description: `The category "${categoryToDelete?.title}" has been deleted successfully.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <PlusCircleIcon size={18} className="mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new job category for employers to use when posting jobs.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Category Title *</Label>
                    <Input
                      id="title"
                      value={newCategory.title}
                      onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                      placeholder="e.g. Software Development"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                      placeholder="Brief description of this category..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddCategory}>Add Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500">Category</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500 hidden md:table-cell">Description</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500">Jobs</th>
                    <th className="text-right p-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3">{category.id}</td>
                        <td className="p-3 font-medium">{category.title}</td>
                        <td className="p-3 text-gray-600 hidden md:table-cell">
                          {category.description.length > 50 
                            ? `${category.description.substring(0, 50)}...` 
                            : category.description}
                        </td>
                        <td className="p-3">{category.jobCount}</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <Dialog open={isEditDialogOpen && currentCategory?.id === category.id} onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (!open) setCurrentCategory(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setCurrentCategory(category)}
                                >
                                  <PencilIcon size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Category</DialogTitle>
                                  <DialogDescription>
                                    Update the details for this job category.
                                  </DialogDescription>
                                </DialogHeader>
                                {currentCategory && (
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-title">Category Title *</Label>
                                      <Input
                                        id="edit-title"
                                        value={currentCategory.title}
                                        onChange={(e) => setCurrentCategory({
                                          ...currentCategory,
                                          title: e.target.value
                                        })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-description">Description</Label>
                                      <Textarea
                                        id="edit-description"
                                        value={currentCategory.description}
                                        onChange={(e) => setCurrentCategory({
                                          ...currentCategory,
                                          description: e.target.value
                                        })}
                                        rows={3}
                                      />
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                                  <Button onClick={handleEditCategory}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                  <TrashIcon size={16} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the "{category.title}" category? 
                                    This will affect {category.jobCount} jobs and cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                    onClick={() => handleDeleteCategory(category.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-gray-500">
                        No categories found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
