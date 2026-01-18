-- Drop existing MDA policies that use mda_name matching (unreliable)
DROP POLICY IF EXISTS "MDA users can view bills for their MDA" ON public.bills;
DROP POLICY IF EXISTS "MDA users can update bills for their MDA" ON public.bills;

-- Create new MDA policies using mda_code (which stores the MDA id) matching against bills.mda_id
CREATE POLICY "MDA users can view bills for their MDA"
ON public.bills
FOR SELECT
USING (
  has_role(auth.uid(), 'mda'::app_role)
  AND EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.user_id = auth.uid()
      AND p.mda_code IS NOT NULL
      AND p.mda_code = bills.mda_id::text
  )
);

CREATE POLICY "MDA users can update bills for their MDA"
ON public.bills
FOR UPDATE
USING (
  has_role(auth.uid(), 'mda'::app_role)
  AND EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.user_id = auth.uid()
      AND p.mda_code IS NOT NULL
      AND p.mda_code = bills.mda_id::text
  )
);