import React from "react";
import Header from "@/app/components/header/header";
import Card from "@/app/components/ui/card";
import H4 from "@/app/components/ui/texts/h4";

const GroupAdminPage = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] bg-[#F7F7F7] dark:bg-[#262629]">
      <Header />
      <div className="flex items-center justify-between m-auto gap-8 h-[450px] w-[1000px]">
        <Card className="h-full w-full hover:bg-gray-50">
          <H4>Natation</H4>
        </Card>
        <Card className="h-full w-full hover:bg-gray-50">
          <H4>Aquabike</H4>
        </Card>
        <Card className="h-full w-full hover:bg-gray-50">
          <H4>Aquagym</H4>
        </Card>
      </div>
    </div>
  );
};

export default GroupAdminPage;
