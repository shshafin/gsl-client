import { ArrowLeft } from "lucide-react"; // Import Icon

// Inside the component...
return (
  <div className="max-w-3xl mx-auto space-y-6">
    
    {/* 🔙 Back Button */}
    <div>
      <Button 
        variant="outline" 
        onClick={() => router.back()} 
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Button>
    </div>

    <Card>
      {/* ... rest of your card ... */}
    </Card>
  </div>
);