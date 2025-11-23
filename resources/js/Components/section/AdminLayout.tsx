import React, { ReactNode } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Menu,
  Bell,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
  Frame,
  Store,
  ToolCase,
  CalendarClock,
  ShieldUser,
} from 'lucide-react';
import Logo from '../logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/lib/TranslationContext';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

interface PageProps {
  auth?: {
    user?: {
      name: string;
      email: string;
    };
    staff?: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
  [key: string]: any;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { props } = usePage<PageProps>();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const staff = props.auth?.staff;
  const { t } = useTranslation();

  const handleLogout = () => {
    router.post('/panel/logout');
  };

  const toggleItemExpansion = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const navigation = [
    {
      name: t?.admin.sidebar.dashboard || 'Dashboard',
      href: '/panel',
      icon: LayoutDashboard,
      current: true,
    },
    {
      name: t?.admin.sidebar.appointment || 'Appointment',
      href: '/panel/appointments',
      icon: CalendarClock,
      current: false,
      children: [
        {
          name: t?.admin.sidebar.allAppointments || 'All Bookings',
          href: '/panel/appointments',
        },
        {
          name: t?.admin.sidebar.pending || 'Pending',
          href: '/panel/appointments/pending',
        },
        {
          name: t?.admin.sidebar.confirmed || 'Confirmed',
          href: '/panel/appointments/confirmed',
        },
        {
          name: t?.admin.sidebar.completed || 'Completed',
          href: '/panel/appointments/completed',
        },
      ],
    },
    {
      name: t?.admin.sidebar.tenant || 'Branches or Tenants',
      href: '/panel/tenants',
      icon: Store,
      current: false,
      children: [
        {
          name: t?.admin.sidebar.allTenant || 'All Branches or Tenants',
          href: '/panel/tenants',
        },
        {
          name: t?.admin.sidebar.addNew || 'Add New',
          href: '/panel/tenants/create',
        },
      ],
    },
    {
      name: t?.admin.sidebar.services || 'Services',
      href: '/panel/services',
      icon: ToolCase,
      current: false,
      children: [
        {
          name: t?.admin.sidebar.allServices || 'All Services',
          href: '/panel/services',
        },
        {
          name: t?.admin.sidebar.addNew || 'Add New',
          href: '/panel/services/create',
        },
        {
          name: t?.admin.sidebar.categories || 'Categories',
          href: '/panel/services/categories',
        },
      ],
    },
    {
      name: t?.admin.sidebar.staff || 'Staff & Admin',
      href: '/panel/staff',
      icon: ShieldUser,
      current: false,
      children: [
        {
          name: t?.admin.sidebar.allStaff || 'All Staff',
          href: '/panel/staff',
        },
        {
          name: t?.admin.sidebar.addNew || 'Add New',
          href: '/panel/staff/create',
        },
      ],
    },
    {
      name: t?.admin.sidebar.customer || 'Customers',
      href: '/panel/customers',
      icon: Users,
      current: false,
      children: [
        {
          name: t?.admin.sidebar.allCustomer || 'All Customers',
          href: '/panel/customers',
        },
        {
          name: t?.admin.sidebar.addNew || 'Add New',
          href: '/panel/customers/create',
        },
      ],
    },
    {
      name: t?.admin.sidebar.analytics || 'Analytics',
      href: '/panel/analytics',
      icon: BarChart3,
      current: false,
      children: [
        {
          name: t?.admin.sidebar.revenue || 'Revenue',
          href: '/panel/analytics/revenue',
        },
        {
          name: t?.admin.sidebar.popularService || 'Popular Services',
          href: '/panel/analytics/services',
        },
        {
          name: t?.admin.sidebar.customerInsight || 'Customer Insights',
          href: '/panel/analytics/customers',
        },
      ],
    },
    {
      name: t?.admin.sidebar.settings || 'Settings',
      href: '/panel/settings',
      icon: Settings,
      current: false,
    },
  ];

  const currentPath = window.location.pathname;

  // Extract the feature from the URL path (e.g., /panel/settings/seo → settings)
  const getFeatureFromPath = (path: string): string => {
    const segments = path.split('/').filter(Boolean); // Remove empty strings
    // segments[0] = 'panel', segments[1] = feature, segments[2] = sub-feature (optional)
    return segments[1] || '';
  };

  const getFeatureFromHref = (href: string): string => {
    const segments = href.split('/').filter(Boolean);
    return segments[1] || '';
  };

  const currentFeature = getFeatureFromPath(currentPath);

  const isItemActive = (item: any) => {
    // Check if this is the exact path match (for items without children)
    if (item.href === currentPath) return true;

    // Check if the feature matches the navigation item's feature
    const itemFeature = getFeatureFromHref(item.href);
    if (itemFeature && itemFeature === currentFeature) return true;

    // Check if any child is active
    if (item.children) {
      return item.children.some((child: any) => child.href === currentPath);
    }
    return false;
  };

  const isItemExpanded = (item: any) => {
    const hasExpandedItems = expandedItems.includes(item.name);
    let hasActiveChild = false;
    if (item.children) {
      hasActiveChild = item.children.some(
        (child: any) => child.href === currentPath
      );
    }

    const isCurrentPathIsInParent = item.children?.some((child: any) =>
      currentPath.startsWith(child.href)
    );

    // Auto-expand if feature matches
    const itemFeature = getFeatureFromHref(item.href);
    const featureMatches = itemFeature && itemFeature === currentFeature;

    if (isCurrentPathIsInParent || featureMatches) {
      if (!expandedItems.includes(item.name)) {
        setExpandedItems((prev) => [...prev, item.name]);
      }
      return true;
    }

    return hasExpandedItems || hasActiveChild;
  };

  const isChildActive = (item: any) => {
    if (item.children) {
      return item.children.find((child: any) => child.href === currentPath);
    }
    return null;
  };

  // Component to render navigation items
  const NavigationItem = ({
    item,
    isCollapsed = false,
  }: {
    item: any;
    isCollapsed?: boolean;
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isItemActive(item);
    const isExpanded = isItemExpanded(item);
    const activeChild = isChildActive(item);

    if (!hasChildren) {
      return (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-blue-100 text-blue-700 '
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
          title={isCollapsed ? item.name : undefined}
        >
          <item.icon
            className={`${isCollapsed ? 'h-5 w-5' : 'mr-3 h-5 w-5'} flex-shrink-0 ${
              isActive
                ? 'text-blue-700'
                : 'text-gray-500 group-hover:text-gray-700'
            }`}
          />
          {!isCollapsed && <span className="truncate">{item.name}</span>}
        </Link>
      );
    }

    return (
      <div key={item.name}>
        <button
          type="button"
          onClick={() => toggleItemExpansion(item.name)}
          className={`group flex items-center cursor-pointer w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
          title={isCollapsed ? item.name : undefined}
        >
          <item.icon
            className={`${isCollapsed ? 'h-5 w-5' : 'mr-3 h-5 w-5'} flex-shrink-0 ${
              isActive
                ? 'text-blue-700'
                : 'text-gray-500 group-hover:text-gray-700'
            }`}
          />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.name}</span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </>
          )}
        </button>
        {!isCollapsed && isExpanded && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child: any) => (
              <Link
                key={child.name}
                href={child.href}
                className={`group flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  activeChild?.href === child.href
                    ? 'bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="truncate">{child.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Head title={title || 'Admin Panel'} />

      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar */}
        <div
          className={`fixed inset-0 flex z-40 md:hidden transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex items-center flex-shrink-0 px-4 py-5">
              <Logo className="h-6" />
            </div>

            <nav className="mt-2 flex-shrink-0 h-full overflow-y-auto pb-4">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <NavigationItem key={item.name} item={item} />
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Static sidebar for desktop */}
        <div
          className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'md:w-16' : 'md:w-64'
          }`}
        >
          <div className="flex flex-col flex-grow bg-white overflow-hidden">
            <div
              className={`flex items-center flex-shrink-0 px-4 py-5 ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              {sidebarCollapsed ? (
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Frame className="text-white" size={12} />
                </div>
              ) : (
                <Logo className="h-6" />
              )}
            </div>

            <nav className="mt-2 flex-grow flex flex-col overflow-y-auto pb-4">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <NavigationItem
                    key={item.name}
                    item={item}
                    isCollapsed={sidebarCollapsed}
                  />
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'md:pl-16' : 'md:pl-64'
          }`}
        >
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
            {/* Mobile menu button */}
            <button
              type="button"
              className="px-4  text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop sidebar toggle */}
            <button
              type="button"
              className="hidden md:flex md:items-center px-4 border-gray-200 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <span className="sr-only">Toggle sidebar</span>
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex-1 pr-4 flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-lg font-semibold text-gray-900">
                  {title || 'Dashboard'}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full transition-colors">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-5 w-5" />
                </button>

                <LanguageSwitcher />
                <div className="flex items-center space-x-3">
                  {staff && (
                    <>
                      <div className="hidden sm:block text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {staff.name}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {staff.role}
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-gray-500 focus:ring-blue-500"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Sign out</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
