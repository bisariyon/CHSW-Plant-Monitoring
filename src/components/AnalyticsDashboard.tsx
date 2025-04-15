import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalyticsDashboardProps {
  className?: string;
}

const AnalyticsDashboard = ({ className = "" }: AnalyticsDashboardProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [chartType, setChartType] = useState("temperature");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`w-full p-6 bg-background ${className}`}>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              View historical data trends and patterns for your crops.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Readings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.8°C</div>
              <p className="text-xs text-muted-foreground mt-1">
                -2.1°C from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Humidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58.3%</div>
              <p className="text-xs text-muted-foreground mt-1">
                +4.2% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Healthy Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18/30</div>
              <p className="text-xs text-muted-foreground mt-1">
                60% health rate
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>R visualizations Data Trends</CardTitle>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select chart" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="humidity">Humidity</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moisture">Soil Moisture</SelectItem>
                  <SelectItem value="health">Plant Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>
              Viewing Rcharts for your selected metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
              <div className="flex gap-4 justify-center text-center p-8">
                <div className="mb-4 text-muted-foreground">
                  <img
                    src="/images/checker.png"
                    alt="PowerBI Chart Placeholder"
                    className="max-w-full h-[300px] object-cover rounded-md mx-auto opacity-70"
                  />
                </div>
                <div className="mb-4 text-muted-foreground">
                  <img
                    src="/images/checker2.png"
                    alt="PowerBI Chart Placeholder"
                    className="max-w-full h-[300px] object-cover rounded-md mx-auto opacity-70"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Correlation</CardTitle>
              <CardDescription>
                Relationship between temperature and plant health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center p-6">
                  <div className="mb-4 text-muted-foreground">
                    <img
                      src="https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80"
                      alt="Correlation Chart Placeholder"
                      className="max-w-full h-[200px] object-cover rounded-md mx-auto opacity-70"
                    />
                  </div>
                  <h3 className="text-lg font-medium">
                    Temperature vs Health Correlation
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    PowerBI correlation analysis chart would appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seasonal Patterns</CardTitle>
              <CardDescription>
                Monthly averages across all metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center p-6">
                  <div className="mb-4 text-muted-foreground">
                    <img
                      src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800&q=80"
                      alt="Seasonal Chart Placeholder"
                      className="max-w-full h-[200px] object-cover rounded-md mx-auto opacity-70"
                    />
                  </div>
                  <h3 className="text-lg font-medium">
                    Seasonal Growth Patterns
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    PowerBI seasonal analysis chart would appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
            <CardDescription>
              Insights derived from PowerBI analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="insights">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="insights">Key Insights</TabsTrigger>
                <TabsTrigger value="recommendations">
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
              </TabsList>
              <TabsContent
                value="insights"
                className="p-4 border rounded-md mt-2"
              >
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                    <span>
                      Temperature fluctuations correlate with 78% of plant
                      health issues
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                    <span>
                      Soil moisture levels have been consistently below optimal
                      range
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                    <span>
                      Light exposure patterns show significant improvement after
                      recent adjustments
                    </span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent
                value="recommendations"
                className="p-4 border rounded-md mt-2"
              >
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>
                      Increase watering frequency by 15% during midday hours
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>
                      Adjust greenhouse ventilation to reduce temperature spikes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>
                      Consider supplemental lighting during cloudy periods
                    </span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent
                value="forecasts"
                className="p-4 border rounded-md mt-2"
              >
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>
                      Predicted 12% yield increase based on current growth
                      trajectory
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>
                      Expected temperature fluctuations may impact growth in
                      next 2 weeks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>
                      Optimal harvest window predicted between June 15-20
                    </span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
