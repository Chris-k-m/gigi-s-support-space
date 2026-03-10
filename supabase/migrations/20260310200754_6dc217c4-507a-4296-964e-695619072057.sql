
-- Speaking requests table
CREATE TABLE public.speaking_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT,
  event_date DATE,
  audience_size TEXT,
  topic_of_interest TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quiz submissions table
CREATE TABLE public.quiz_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  child_age_group TEXT NOT NULL,
  challenges TEXT[] DEFAULT '{}',
  receiving_therapy TEXT,
  looking_for TEXT[] DEFAULT '{}',
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.speaking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit
CREATE POLICY "Anyone can submit speaking requests" ON public.speaking_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can submit quiz" ON public.quiz_submissions FOR INSERT TO public WITH CHECK (true);

-- Admins can manage
CREATE POLICY "Admins can manage speaking requests" ON public.speaking_requests FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage quiz submissions" ON public.quiz_submissions FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Updated at triggers
CREATE TRIGGER update_speaking_requests_updated_at BEFORE UPDATE ON public.speaking_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quiz_submissions_updated_at BEFORE UPDATE ON public.quiz_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
