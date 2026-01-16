import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UserConfig {
  email: string;
  password: string;
  role: 'supplier' | 'spv' | 'mda' | 'treasury' | 'admin';
  profile: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Fetch MDAs for reference
    const { data: mdas } = await supabase.from('mdas').select('id, name');
    const mdaList = mdas || [];

    // Define demo users
    const users: UserConfig[] = [];
    const password = 'demo1234';

    // 12 Suppliers
    const supplierCompanies = [
      'Apex Construction Ltd', 'BuildRight Nigeria', 'TechSupply Co', 'MedEquip Solutions',
      'FoodServe Enterprises', 'CleanEnergy Systems', 'TransportPro Ltd', 'OfficeMax Supplies',
      'SecureIT Services', 'GreenFarm Agro', 'WaterWorks Engineering', 'PowerGrid Solutions'
    ];
    
    for (let i = 0; i < 12; i++) {
      users.push({
        email: `supplier${i + 1}@demo.com`,
        password,
        role: 'supplier',
        profile: {
          full_name: `Supplier User ${i + 1}`,
          company_name: supplierCompanies[i],
          registration_number: `RC${100000 + i}`,
          tax_id: `TIN${200000 + i}`,
          phone: `+234801${String(i).padStart(7, '0')}`,
          address: `${i + 1} Industrial Avenue, Lagos`,
          bank_name: ['First Bank', 'GTBank', 'Zenith Bank', 'Access Bank'][i % 4],
          bank_account: `${1000000000 + i}`,
          profile_completed: true,
        }
      });
    }

    // 12 SPVs
    const spvNames = [
      'Alpha Capital SPV', 'Beta Investments', 'Gamma Finance', 'Delta Funding',
      'Epsilon Holdings', 'Zeta Capital', 'Eta Investments', 'Theta Finance',
      'Iota Funding', 'Kappa Holdings', 'Lambda Capital', 'Mu Investments'
    ];

    for (let i = 0; i < 12; i++) {
      users.push({
        email: `spv${i + 1}@demo.com`,
        password,
        role: 'spv',
        profile: {
          full_name: `SPV Manager ${i + 1}`,
          spv_name: spvNames[i],
          license_number: `SPV-LIC-${3000 + i}`,
          phone: `+234802${String(i).padStart(7, '0')}`,
          profile_completed: true,
        }
      });
    }

    // 12 MDA Users (distributed across MDAs)
    for (let i = 0; i < 12; i++) {
      const mda = mdaList[i % mdaList.length];
      users.push({
        email: `mda${i + 1}@demo.com`,
        password,
        role: 'mda',
        profile: {
          full_name: `MDA Officer ${i + 1}`,
          mda_name: mda?.name || `Ministry ${i + 1}`,
          mda_code: mda?.id || null,
          department: ['Procurement', 'Finance', 'Administration'][i % 3],
          phone: `+234803${String(i).padStart(7, '0')}`,
          profile_completed: true,
        }
      });
    }

    // 12 Treasury Users
    for (let i = 0; i < 12; i++) {
      users.push({
        email: `treasury${i + 1}@demo.com`,
        password,
        role: 'treasury',
        profile: {
          full_name: `Treasury Officer ${i + 1}`,
          treasury_office: ['Federal Treasury', 'State Treasury', 'Central Bank Liaison'][i % 3],
          employee_id: `NT-${4000 + i}`,
          phone: `+234804${String(i).padStart(7, '0')}`,
          profile_completed: true,
        }
      });
    }

    // 2 Admins
    users.push({
      email: 'admin@demo.com',
      password,
      role: 'admin',
      profile: {
        full_name: 'System Administrator',
        profile_completed: true,
      }
    });
    users.push({
      email: 'admin2@demo.com',
      password,
      role: 'admin',
      profile: {
        full_name: 'Platform Manager',
        profile_completed: true,
      }
    });

    const results = { created: 0, skipped: 0, errors: [] as string[] };
    const createdSupplierIds: string[] = [];

    // Create users
    for (const user of users) {
      try {
        // Check if user exists
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const exists = existingUsers?.users?.find(u => u.email === user.email);
        
        if (exists) {
          results.skipped++;
          if (user.role === 'supplier') {
            createdSupplierIds.push(exists.id);
          }
          continue;
        }

        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: { full_name: user.profile.full_name }
        });

        if (authError) {
          results.errors.push(`${user.email}: ${authError.message}`);
          continue;
        }

        const userId = authData.user.id;

        // Add role
        await supabase.from('user_roles').insert({
          user_id: userId,
          role: user.role
        });

        // Update profile
        await supabase.from('profiles').update({
          ...user.profile,
          email: user.email
        }).eq('user_id', userId);

        results.created++;

        if (user.role === 'supplier') {
          createdSupplierIds.push(userId);
        }

      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        results.errors.push(`${user.email}: ${errorMessage}`);
      }
    }

    // Create sample bills for suppliers
    const billDescriptions = [
      'Supply of office equipment and furniture',
      'Road construction and maintenance services',
      'IT infrastructure upgrade and support',
      'Medical supplies and equipment',
      'Catering services for government events',
      'Security services and equipment',
      'Vehicle maintenance and repairs',
      'Building renovation and repairs',
      'Educational materials supply',
      'Agricultural equipment and supplies'
    ];

    let billsCreated = 0;

    for (let i = 0; i < Math.min(createdSupplierIds.length, 8); i++) {
      const supplierId = createdSupplierIds[i];
      const mda = mdaList[i % mdaList.length];
      
      if (!mda) continue;

      // Create 2-3 bills per supplier
      const numBills = 2 + (i % 2);
      
      for (let j = 0; j < numBills; j++) {
        const amount = (Math.floor(Math.random() * 50) + 5) * 1000000; // 5M to 55M
        const invoiceDate = new Date();
        invoiceDate.setDate(invoiceDate.getDate() - Math.floor(Math.random() * 30));

        await supabase.from('bills').insert({
          supplier_id: supplierId,
          mda_id: mda.id,
          invoice_number: `INV-${2025}-${String(i * 10 + j + 1).padStart(4, '0')}`,
          invoice_date: invoiceDate.toISOString().split('T')[0],
          due_date: new Date(invoiceDate.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          amount,
          currency: 'NGN',
          description: billDescriptions[(i + j) % billDescriptions.length],
          work_description: `Completed work as per contract agreement for ${mda.name}`,
          contract_reference: `CTR-${2024}-${String(i * 10 + j + 100).padStart(4, '0')}`,
          status: 'submitted',
          status_history: JSON.stringify([{
            status: 'submitted',
            timestamp: new Date().toISOString(),
            note: 'Bill submitted by supplier'
          }])
        });

        billsCreated++;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Created ${results.created} users, skipped ${results.skipped} existing users, created ${billsCreated} sample bills`,
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    console.error('Seed error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
