import { HallAvailabilityBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useHalls } from "@/hooks/useHalls";
import { formatCount } from "@/lib/format";
import {
  FACILITY_OPTIONS,
  type HallFilter,
  type HallWithStatus,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarPlus,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const CAPACITY_OPTIONS = [
  { value: "0", label: "Semua kapasitas" },
  { value: "20", label: "Min. 20 orang" },
  { value: "50", label: "Min. 50 orang" },
  { value: "100", label: "Min. 100 orang" },
  { value: "200", label: "Min. 200 orang" },
  { value: "500", label: "Min. 500 orang" },
];

const ALL_FACILITIES = "semua";

function HallCard({ entry, index }: { entry: HallWithStatus; index: number }) {
  const { hall, status } = entry;
  const mainFacilities = hall.facilities.slice(0, 3);
  const extraFacilities = hall.facilities.length - mainFacilities.length;

  return (
    <Card
      className="group flex flex-col overflow-hidden rounded-lg border border-border shadow-subtle transition-smooth hover:-translate-y-0.5 hover:shadow-elevated"
      data-ocid={`catalog.item.${index + 1}`}
    >
      <Link
        to="/aula/$hallId"
        params={{ hallId: hall.id.toString() }}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid={`catalog.card_link.${index + 1}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <img
            src={hall.photoUrl || "/assets/images/placeholder.svg"}
            alt={`Foto ${hall.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-smooth group-hover:scale-[1.03]"
          />
          <div className="absolute right-3 top-3">
            <HallAvailabilityBadge
              status={status}
              className="bg-card/95 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold text-foreground">
              {hall.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {hall.building}
                {hall.location ? ` · ${hall.location}` : ""}
              </span>
            </p>
          </div>

          <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Users
              className="h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            Kapasitas {formatCount(hall.capacity)} orang
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {mainFacilities.length > 0 ? (
              mainFacilities.map((facility) => (
                <span
                  key={facility}
                  className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {facility}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                Fasilitas belum dicatat
              </span>
            )}
            {extraFacilities > 0 && (
              <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                +{extraFacilities} lainnya
              </span>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}

function CatalogSkeleton() {
  const ids = Array.from({ length: 6 }, (_, i) => `catalog-skeleton-${i}`);
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
      data-ocid="catalog.loading_state"
    >
      {ids.map((id) => (
        <Card
          key={id}
          className="overflow-hidden rounded-lg border border-border shadow-subtle"
        >
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="flex flex-col gap-3 p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [minCapacity, setMinCapacity] = useState("0");
  const [facility, setFacility] = useState(ALL_FACILITIES);

  const filter = useMemo<HallFilter>(
    () => ({
      search: search.trim() || undefined,
      minCapacity: minCapacity === "0" ? undefined : BigInt(minCapacity),
      facilities: facility === ALL_FACILITIES ? [] : [facility],
    }),
    [search, minCapacity, facility],
  );

  const { data: halls, isLoading, isError, refetch } = useHalls(filter);

  const hasActiveFilter =
    search.trim() !== "" || minCapacity !== "0" || facility !== ALL_FACILITIES;

  function resetFilters() {
    setSearch("");
    setMinCapacity("0");
    setFacility(ALL_FACILITIES);
  }

  const results = halls ?? [];

  return (
    <div className="flex flex-col gap-6" data-ocid="catalog.page">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Katalog Aula
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Jelajahi seluruh aula dan ruangan yang tersedia, lalu pilih yang
            paling sesuai untuk kegiatan Anda.
          </p>
        </div>
        <Button
          asChild
          type="button"
          className="gap-2"
          data-ocid="catalog.primary_button"
        >
          <Link to="/pemesanan/baru" search={{}}>
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Ajukan Pemesanan
          </Link>
        </Button>
      </header>

      <Card
        className="rounded-lg border border-border bg-card p-4 shadow-subtle sm:p-5"
        data-ocid="catalog.filter.panel"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-end">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="catalog-search">Cari aula</Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="catalog-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nama aula atau gedung…"
                className="pl-9"
                data-ocid="catalog.search_input"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="catalog-capacity">Kapasitas minimum</Label>
            <Select value={minCapacity} onValueChange={setMinCapacity}>
              <SelectTrigger
                id="catalog-capacity"
                data-ocid="catalog.capacity_select"
              >
                <SelectValue placeholder="Semua kapasitas" />
              </SelectTrigger>
              <SelectContent>
                {CAPACITY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="catalog-facility">Fasilitas</Label>
            <Select value={facility} onValueChange={setFacility}>
              <SelectTrigger
                id="catalog-facility"
                data-ocid="catalog.facility_select"
              >
                <SelectValue placeholder="Semua fasilitas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_FACILITIES}>Semua fasilitas</SelectItem>
                {FACILITY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            disabled={!hasActiveFilter}
            className="gap-2"
            data-ocid="catalog.reset_button"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Reset
          </Button>
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <p
          className="text-sm text-muted-foreground"
          data-ocid="catalog.result_count"
        >
          {isLoading
            ? "Memuat aula…"
            : `${formatCount(results.length)} aula ditemukan`}
        </p>
        {hasActiveFilter && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Filter aktif
          </span>
        )}
      </div>

      {isLoading ? (
        <CatalogSkeleton />
      ) : isError ? (
        <Card
          className="flex flex-col items-center gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-10 text-center"
          data-ocid="catalog.error_state"
        >
          <h2 className="font-display text-lg font-semibold text-foreground">
            Gagal memuat katalog aula
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Terjadi kendala saat mengambil data aula. Silakan coba lagi.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
            data-ocid="catalog.retry_button"
          >
            Coba lagi
          </Button>
        </Card>
      ) : results.length === 0 ? (
        <Card
          className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-card p-12 text-center"
          data-ocid="catalog.empty_state"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Building2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-display text-lg font-semibold text-foreground">
            {hasActiveFilter ? "Tidak ada aula yang cocok" : "Belum ada aula"}
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            {hasActiveFilter
              ? "Coba ubah kata kunci, kapasitas minimum, atau fasilitas yang dipilih."
              : "Katalog aula masih kosong. Silakan periksa kembali nanti."}
          </p>
          {hasActiveFilter && (
            <Button
              type="button"
              variant="outline"
              onClick={resetFilters}
              data-ocid="catalog.empty_reset_button"
            >
              Reset filter
            </Button>
          )}
        </Card>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3",
            "animate-fade-in",
          )}
          data-ocid="catalog.list"
        >
          {results.map((entry, index) => (
            <HallCard
              key={entry.hall.id.toString()}
              entry={entry}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
