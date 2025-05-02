import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { format } from "date-fns";
import LiveChat from "@/components/LiveChat";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

type TimeSlot = {
  id: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  formattedTime: string;
};

type ServiceType = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: number;
  isActive: boolean;
};

type ServiceLocation = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  instructions?: string;
  userId?: number;
  isActive: boolean;
};

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [serviceTypeId, setServiceTypeId] = useState<string>("");
  const [serviceLocationId, setServiceLocationId] = useState<string>("");
  const [timeSlotId, setTimeSlotId] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Fetch service types
  const { data: serviceTypes, isLoading: isLoadingServiceTypes } = useQuery({
    queryKey: ['/api/service-types']
  });

  // Fetch service locations
  const { data: serviceLocations, isLoading: isLoadingServiceLocations } = useQuery({
    queryKey: ['/api/service-locations']
  });

  // Fetch available time slots for selected date and service type
  const { data: availableTimeSlots, isLoading: isLoadingTimeSlots } = useQuery({
    queryKey: ['/api/available-time-slots', date && format(date, 'yyyy-MM-dd'), serviceTypeId],
    enabled: !!date && !!serviceTypeId,
    queryFn: async ({ queryKey }) => {
      const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
      const response = await fetch(`/api/available-time-slots?date=${formattedDate}&serviceTypeId=${serviceTypeId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch available time slots');
      }
      
      return response.json();
    }
  });

  // Calculate total price based on selected service type
  const getServiceTypePrice = (): number => {
    if (!serviceTypeId || !serviceTypes?.data) return 0;
    
    const selectedType = serviceTypes.data.find(
      (type: ServiceType) => type.id === parseInt(serviceTypeId)
    );
    
    return selectedType ? parseFloat(selectedType.price) : 0;
  };

  // Book appointment mutation
  const bookAppointmentMutation = useMutation({
    mutationFn: async () => {
      if (!date || !serviceTypeId || !serviceLocationId || !timeSlotId) {
        throw new Error("Please fill out all required fields");
      }

      const appointmentData = {
        serviceTypeId: parseInt(serviceTypeId),
        serviceLocationId: parseInt(serviceLocationId),
        timeSlotId: parseInt(timeSlotId),
        date: format(date, 'yyyy-MM-dd'),
        totalPrice: getServiceTypePrice().toString(),
        notes: notes.trim() || null
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book appointment');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your appointment has been scheduled.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      setLocation("/");
    },
    onError: (error: any) => {
      console.error("Error booking appointment:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to book appointment. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleBookAppointment = async () => {
    // Validate required fields
    if (!date) {
      toast({
        title: "Missing information",
        description: "Please select a date",
        variant: "destructive"
      });
      return;
    }

    if (!serviceTypeId) {
      toast({
        title: "Missing information",
        description: "Please select a service type",
        variant: "destructive"
      });
      return;
    }

    if (!serviceLocationId) {
      toast({
        title: "Missing information",
        description: "Please select a service location",
        variant: "destructive"
      });
      return;
    }

    if (!timeSlotId) {
      toast({
        title: "Missing information",
        description: "Please select a time slot",
        variant: "destructive"
      });
      return;
    }

    // Book the appointment
    bookAppointmentMutation.mutate();
  };

  // Format price display
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  // Get selected service type details
  const getSelectedServiceType = (): ServiceType | undefined => {
    if (!serviceTypeId || !serviceTypes?.data) return undefined;
    
    return serviceTypes.data.find(
      (type: ServiceType) => type.id === parseInt(serviceTypeId)
    );
  };

  // Get selected service location details
  const getSelectedServiceLocation = (): ServiceLocation | undefined => {
    if (!serviceLocationId || !serviceLocations?.data) return undefined;
    
    return serviceLocations.data.find(
      (location: ServiceLocation) => location.id === parseInt(serviceLocationId)
    );
  };

  const isLoading = isLoadingServiceTypes || 
                    isLoadingServiceLocations || 
                    (!!date && !!serviceTypeId && isLoadingTimeSlots) ||
                    bookAppointmentMutation.isPending;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bubble text-4xl text-center mb-8">Schedule Your Poop Pickup</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Selection Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book Your Appointment</CardTitle>
              <CardDescription>Select your service details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Service Type */}
              <div className="space-y-2">
                <Label htmlFor="service-type">Service Type</Label>
                <Select 
                  value={serviceTypeId} 
                  onValueChange={setServiceTypeId}
                  disabled={isLoading}
                >
                  <SelectTrigger id="service-type">
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes?.data?.map((type: ServiceType) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name} - {formatPrice(parseFloat(type.price))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Service Location */}
              <div className="space-y-2">
                <Label htmlFor="service-location">Service Location</Label>
                <Select 
                  value={serviceLocationId} 
                  onValueChange={setServiceLocationId}
                  disabled={isLoading}
                >
                  <SelectTrigger id="service-location">
                    <SelectValue placeholder="Select a service location" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceLocations?.data?.map((location: ServiceLocation) => (
                      <SelectItem key={location.id} value={location.id.toString()}>
                        {location.name} - {location.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Select Date</Label>
                <div className="border rounded-md p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      // Disable dates in the past
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    className="mx-auto"
                  />
                </div>
              </div>

              {/* Time Slot */}
              {date && serviceTypeId && (
                <div className="space-y-2">
                  <Label htmlFor="time-slot">Time Slot</Label>
                  <Select 
                    value={timeSlotId} 
                    onValueChange={setTimeSlotId}
                    disabled={isLoading || !(availableTimeSlots?.data?.length > 0)}
                  >
                    <SelectTrigger id="time-slot">
                      <SelectValue placeholder={
                        isLoadingTimeSlots 
                          ? "Loading time slots..." 
                          : availableTimeSlots?.data?.length > 0
                            ? "Select a time slot"
                            : "No time slots available"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimeSlots?.data?.map((slot: TimeSlot) => (
                        <SelectItem key={slot.id} value={slot.id.toString()}>
                          {slot.formattedTime}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Special Instructions (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions for our team? (Gate code, dog names, yard location, etc.)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isLoading}
                  className="h-24"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full cta-button" 
                onClick={handleBookAppointment}
                disabled={isLoading || !date || !serviceTypeId || !serviceLocationId || !timeSlotId}
              >
                {isLoading ? "Processing..." : "Schedule Pickup"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
              <CardDescription>Review your appointment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Type Summary */}
              <div>
                <h3 className="font-bold mb-2">Service Type</h3>
                {getSelectedServiceType() ? (
                  <div className="bg-primary/10 p-4 rounded-md">
                    <p className="font-semibold text-lg">
                      {getSelectedServiceType()?.name}
                    </p>
                    <p className="text-gray-600 mb-2">
                      {getSelectedServiceType()?.description}
                    </p>
                    <p className="text-primary font-bold">
                      {formatPrice(parseFloat(getSelectedServiceType()?.price || "0"))}
                    </p>
                    <p className="text-sm text-gray-500">
                      Approx. {getSelectedServiceType()?.duration} minutes
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    Please select a service type
                  </p>
                )}
              </div>

              {/* Location Summary */}
              <div>
                <h3 className="font-bold mb-2">Service Location</h3>
                {getSelectedServiceLocation() ? (
                  <div className="bg-primary/10 p-4 rounded-md">
                    <p className="font-semibold">
                      {getSelectedServiceLocation()?.name}
                    </p>
                    <p className="text-gray-600">
                      {getSelectedServiceLocation()?.address}<br />
                      {getSelectedServiceLocation()?.city}, {getSelectedServiceLocation()?.state} {getSelectedServiceLocation()?.zipCode}
                    </p>
                    {getSelectedServiceLocation()?.instructions && (
                      <div className="mt-2 text-sm border-t pt-2 border-gray-200">
                        <p className="font-semibold">Instructions:</p>
                        <p>{getSelectedServiceLocation()?.instructions}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    Please select a service location
                  </p>
                )}
              </div>

              {/* Date & Time Summary */}
              <div>
                <h3 className="font-bold mb-2">Date & Time</h3>
                <div className="bg-primary/10 p-4 rounded-md">
                  {date ? (
                    <p className="mb-2">
                      <span className="font-semibold">Date:</span> {format(date, 'EEEE, MMMM d, yyyy')}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic mb-2">Please select a date</p>
                  )}
                  
                  {timeSlotId && availableTimeSlots?.data ? (
                    <p>
                      <span className="font-semibold">Time:</span> {
                        availableTimeSlots.data.find((slot: TimeSlot) => slot.id === parseInt(timeSlotId))?.formattedTime
                      }
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Please select a time</p>
                  )}
                </div>
              </div>

              {/* Special Instructions Summary */}
              {notes && (
                <div>
                  <h3 className="font-bold mb-2">Special Instructions</h3>
                  <div className="bg-primary/10 p-4 rounded-md">
                    <p>{notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col items-start">
              <div className="w-full border-t pt-4 mb-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Price:</span>
                  <span className="text-primary">
                    {formatPrice(getServiceTypePrice())}
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Note: Our team will contact you to confirm your appointment.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <LiveChat />
    </div>
  );
}