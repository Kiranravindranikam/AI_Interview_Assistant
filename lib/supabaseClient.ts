// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://pvbsvfofpstvioinrvjn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2YnN2Zm9mcHN0dmlvaW5ydmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MTY4MjksImV4cCI6MjA2OTk5MjgyOX0.t3keHIiAxqNEFE32uLeUsCSqHsSJPOcq7pVYOl7EyAk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
