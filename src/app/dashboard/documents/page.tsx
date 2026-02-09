"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Document } from "@/generated/prisma/client";
import { bytesToMB } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { format } from "date-fns";
import { FileText, Image, MoreHorizontal, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface CustomDocument extends Document {
  type: string;
}

// const documents = [
//   {
//     id: 1,
//     name: "contract_agreement_v2.pdf",
//     type: "PDF",
//     status: "success",
//     date: "2024-01-15T10:30:00Z",
//     size: "2.4 MB",
//   },
//   {
//     id: 2,
//     name: "handwritten_affidavit.jpg",
//     type: "JPG",
//     status: "success",
//     date: "2024-01-15T09:15:00Z",
//     size: "1.8 MB",
//   },
//   {
//     id: 3,
//     name: "legal_notice_scan.png",
//     type: "PNG",
//     status: "pending",
//     date: "2024-01-15T08:45:00Z",
//     size: "3.2 MB",
//   },
//   {
//     id: 4,
//     name: "court_filing_document.pdf",
//     type: "PDF",
//     status: "failed",
//     date: "2024-01-14T16:20:00Z",
//     size: "1.5 MB",
//   },
//   {
//     id: 5,
//     name: "signed_contract_final.pdf",
//     type: "PDF",
//     status: "success",
//     date: "2024-01-14T14:10:00Z",
//     size: "2.1 MB",
//   },
// ];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Success
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getFileIcon = (type: string) => {
  if (type === "PDF") {
    return <FileText className="h-4 w-4 text-red-500" />;
  } else if (type === "PNG") {
    return <Image className="h-4 w-4 text-blue-500" />;
  } else if (type === "JPEG") {
    return <Image className="h-4 w-4 text-yellow-500" />;
  } else {
    return <Image className="h-4 w-4 text-green-500" />;
  }
};

export default function Documents() {
  // const [documents, setDocuments] = useState<CustomDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { documents } = useSelector((state: RootState) => state.documents);
  const [custom_documents, setCustom_documents] = useState<CustomDocument[]>(
    [],
  );

  const filteredDocuments = custom_documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // useEffect(() => {
  //   const fetch_docs = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch("/api/documents/get-all", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       const res = await response.json();

  //       if (!res.success) {
  //         console.log(res.message);
  //         return;
  //       }

  //       const type_added_docs = res.data.map((doc: CustomDocument) => ({
  //         ...doc,
  //         type: doc.name.split(".")[1].toUpperCase(),
  //       }));

  //       setDocuments(type_added_docs);
  //     } catch (error) {
  //       console.log("error while fetching documents: ", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetch_docs();
  // }, []);

  useEffect(() => {
    if (!documents) return;
    const type_added_docs: CustomDocument[] = documents.map(
      (doc: Document) => ({
        ...doc,
        type: doc.name.split(".")[1].toUpperCase(),
      }),
    );
    setCustom_documents(type_added_docs);
  }, [documents]);

  const handleDocumentDelete = async (docId: string) => {
    try {
      const response = await fetch(`/api/documents/delete?docId=${docId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }
      console.log(res.data);

      const filteredDocuments = documents.filter((doc) => doc.id !== docId);

      // setDocuments(filteredDocuments);
    } catch (error) {
      console.log("error while deleting document: ", error);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                My Documents
              </h1>
              <p className="text-muted-foreground">
                Manage and view all your converted documents
              </p>
            </div>
            <Link href="/dashboard/upload">
              <Button>Upload New Document</Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="JPG">JPG</SelectItem>
                <SelectItem value="PNG">PNG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Documents Table */}
          <div className="rounded-md border">
            <Table className="bg-background">
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isLoading
                  ? filteredDocuments
                      .slice()
                      .reverse()
                      .map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getFileIcon(doc.type)}
                              <span className="font-medium">{doc.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{doc.type}</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(doc.status)}</TableCell>
                          <TableCell>
                            {format(
                              new Date(doc.createdAt),
                              "MMM dd, yyyy 'at' hh:mm a",
                            )}
                          </TableCell>
                          <TableCell>
                            {bytesToMB(parseInt(doc.size))} MB
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-destructive hover:!text-destructive"
                                  onClick={() => handleDocumentDelete(doc.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                  : [...Array(5)].map((_, i) => (
                      <DocumentTableSkeletonRow key={i} />
                    ))}
              </TableBody>
            </Table>
          </div>

          {filteredDocuments.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No documents found matching your criteria.
              </p>
            </div>
          )}
      </div>
    </>
  );
}

export function DocumentTableSkeletonRow() {
  return (
    <TableRow>
      {/* File Icon + Name */}
      <TableCell>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
      </TableCell>

      {/* File Type Badge */}
      <TableCell>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>

      {/* Status Badge */}
      <TableCell>
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>

      {/* Created At */}
      <TableCell>
        <Skeleton className="h-4 w-36" />
      </TableCell>

      {/* Size */}
      <TableCell>
        <Skeleton className="h-4 w-12" />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <Button variant="ghost" className="h-8 w-8 p-0" disabled>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
