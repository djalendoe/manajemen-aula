import { ActiveBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateHall,
  useDeactivateHall,
  useHalls,
  useUpdateHall,
} from "@/hooks/useHalls";
import { formatCount } from "@/lib/format";
import { FACILITY_OPTIONS, type Hall, type HallInput } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Building2,
  ImageOff,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Power,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface HallFormState {
  name: string;
  description: string;
  photoUrl: string;
  capacity: string;
  building: string;
  location: string;
  facilities: string[];
}

const EMPTY_FORM: HallFormState = {
  name: "",
  description: "",
  photoUrl: "",
  capacity: "",
  building: "",
  location: "",
  facilities: [],
};

function toFormState(hall: Hall): HallFormState {
  return {
    name: hall.name,
    description: hall.description,
    photoUrl: hall.photoUrl,
    capacity: hall.capacity.toString(),
    building: hall.building,
    location: hall.location,
    facilities: [...hall.facilities],
  };
}

function HallThumb({ hall }: { hall: Hall }) {
  const [failed, setFailed] = useState(false);
  if (!hall.photoUrl || failed) {
    return (
      <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
        <ImageOff className="h-6 w-6" aria-hidden="true" />
      </div>
    );
  }
  return (
    <img
      src={hall.photoUrl}
      alt={`Foto ${hall.name}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-24 w-32 shrink-0 rounded-lg border border-border object-cover"
    />
  );
}

function HallsSkeleton() {
  return (
    <div className="space-y-4" data-ocid="admin_halls.loading_state">
      {Array.from({ length: 3 }, (_, i) => `hall-skeleton-${i}`).map((id) => (
        <Card key={id} className="rounded-lg border-border shadow-subtle">
          <CardContent className="flex gap-4 p-5">
            <Skeleton className="h-24 w-32 rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-6 w-40 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminHallsPage() {
  const { data: halls, isLoading } = useHalls({ facilities: [] });
  const createHall = useCreateHall();
  const updateHall = useUpdateHall();
  const deactivateHall = useDeactivateHall();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Hall | null>(null);
  const [form, setForm] = useState<HallFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deactivateTarget, setDeactivateTarget] = useState<Hall | null>(null);

  const saving = createHall.isPending || updateHall.isPending;

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setFormOpen(true);
  }

  function openEdit(hall: Hall) {
    setEditing(hall);
    setForm(toFormState(hall));
    setErrors({});
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  function toggleFacility(value: string) {
    setForm((current) => ({
      ...current,
      facilities: current.facilities.includes(value)
        ? current.facilities.filter((item) => item !== value)
        : [...current.facilities, value],
    }));
  }

  function validate(): HallInput | null {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Nama aula wajib diisi.";
    if (!form.building.trim()) next.building = "Gedung wajib diisi.";
    if (!form.location.trim()) next.location = "Lokasi wajib diisi.";
    const capacity = Number(form.capacity);
    if (!form.capacity.trim() || !Number.isFinite(capacity) || capacity <= 0) {
      next.capacity = "Kapasitas harus berupa angka lebih dari 0.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return null;
    return {
      name: form.name.trim(),
      description: form.description.trim(),
      photoUrl: form.photoUrl.trim(),
      capacity: BigInt(Math.floor(capacity)),
      building: form.building.trim(),
      location: form.location.trim(),
      facilities: form.facilities,
    };
  }

  function submitForm() {
    const input = validate();
    if (!input) return;
    if (editing) {
      updateHall.mutate(
        { id: editing.id, input: { ...input, active: editing.active } },
        {
          onSuccess: () => {
            toast.success("Aula berhasil diperbarui.");
            closeForm();
          },
          onError: () => toast.error("Gagal memperbarui aula."),
        },
      );
    } else {
      createHall.mutate(input, {
        onSuccess: () => {
          toast.success("Aula berhasil ditambahkan.");
          closeForm();
        },
        onError: () => toast.error("Gagal menambahkan aula."),
      });
    }
  }

  function confirmDeactivate() {
    if (!deactivateTarget) return;
    const target = deactivateTarget;
    deactivateHall.mutate(target.id, {
      onSuccess: () => {
        toast.success("Aula dinonaktifkan.");
        setDeactivateTarget(null);
      },
      onError: () => toast.error("Gagal menonaktifkan aula."),
    });
  }

  const list = halls ?? [];

  return (
    <div className="space-y-6" data-ocid="admin_halls.page">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Kelola Aula
          </h1>
          <p className="text-sm text-muted-foreground">
            Tambah, ubah, dan nonaktifkan aula beserta kapasitas dan
            fasilitasnya.
          </p>
        </div>
        <Button
          type="button"
          onClick={openCreate}
          className="gap-2"
          data-ocid="admin_halls.add_button"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Tambah Aula
        </Button>
      </header>

      {isLoading ? (
        <HallsSkeleton />
      ) : list.length === 0 ? (
        <Card className="rounded-lg border-border shadow-subtle">
          <CardContent
            className="flex flex-col items-center gap-3 px-5 py-14 text-center"
            data-ocid="admin_halls.empty_state"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="font-display text-lg font-semibold">
              Belum ada aula terdaftar
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Mulai dengan menambahkan aula pertama beserta kapasitas dan
              fasilitasnya.
            </p>
            <Button
              type="button"
              onClick={openCreate}
              className="mt-1 gap-2"
              data-ocid="admin_halls.empty_add_button"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Tambah Aula
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4" data-ocid="admin_halls.list">
          {list.map(({ hall }, index) => (
            <Card
              key={hall.id.toString()}
              className="rounded-lg border-border shadow-subtle transition-smooth hover:shadow-elevated"
              data-ocid={`admin_halls.item.${index + 1}`}
            >
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
                <HallThumb hall={hall} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-semibold tracking-tight">
                      {hall.name}
                    </h2>
                    <ActiveBadge active={hall.active} />
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {hall.description || "Belum ada deskripsi."}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      {formatCount(hall.capacity)} orang
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {hall.building} · {hall.location}
                    </span>
                  </div>
                  {hall.facilities.length > 0 ? (
                    <ul className="flex flex-wrap gap-1.5 pt-1">
                      {hall.facilities.map((facility) => (
                        <li
                          key={facility}
                          className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                        >
                          {facility}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-start gap-2 sm:flex-col">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(hall)}
                    className="gap-1.5"
                    data-ocid={`admin_halls.edit_button.${index + 1}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Ubah
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!hall.active}
                    onClick={() => setDeactivateTarget(hall)}
                    className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    data-ocid={`admin_halls.deactivate_button.${index + 1}`}
                  >
                    <Power className="h-4 w-4" aria-hidden="true" />
                    Nonaktifkan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          if (!open) closeForm();
        }}
      >
        <DialogContent
          className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
          data-ocid="admin_halls.form_dialog"
        >
          <DialogHeader>
            <DialogTitle>{editing ? "Ubah Aula" : "Tambah Aula"}</DialogTitle>
            <DialogDescription>
              Lengkapi informasi aula. Kolom bertanda bintang wajib diisi.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hall-name">Nama aula *</Label>
              <Input
                id="hall-name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Contoh: Aula Serbaguna"
                aria-invalid={Boolean(errors.name)}
                data-ocid="admin_halls.name_input"
              />
              {errors.name ? (
                <p className="text-sm text-destructive">{errors.name}</p>
              ) : null}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hall-description">Deskripsi</Label>
              <Textarea
                id="hall-description"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Deskripsi singkat mengenai aula dan peruntukannya."
                rows={3}
                data-ocid="admin_halls.description_textarea"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hall-photo">URL foto</Label>
              <Input
                id="hall-photo"
                type="url"
                value={form.photoUrl}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    photoUrl: event.target.value,
                  }))
                }
                placeholder="https://contoh.com/foto-aula.jpg"
                data-ocid="admin_halls.photo_input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hall-capacity">Kapasitas (orang) *</Label>
              <Input
                id="hall-capacity"
                type="number"
                min={1}
                inputMode="numeric"
                value={form.capacity}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    capacity: event.target.value,
                  }))
                }
                placeholder="Contoh: 200"
                aria-invalid={Boolean(errors.capacity)}
                data-ocid="admin_halls.capacity_input"
              />
              {errors.capacity ? (
                <p className="text-sm text-destructive">{errors.capacity}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hall-building">Gedung *</Label>
              <Input
                id="hall-building"
                value={form.building}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    building: event.target.value,
                  }))
                }
                placeholder="Contoh: Gedung A"
                aria-invalid={Boolean(errors.building)}
                data-ocid="admin_halls.building_input"
              />
              {errors.building ? (
                <p className="text-sm text-destructive">{errors.building}</p>
              ) : null}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hall-location">Lokasi *</Label>
              <Input
                id="hall-location"
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
                placeholder="Contoh: Lantai 2, Sayap Timur"
                aria-invalid={Boolean(errors.location)}
                data-ocid="admin_halls.location_input"
              />
              {errors.location ? (
                <p className="text-sm text-destructive">{errors.location}</p>
              ) : null}
            </div>

            <fieldset className="space-y-2 sm:col-span-2">
              <legend className="text-sm font-medium">Fasilitas</legend>
              <div className="flex flex-wrap gap-2 pt-1">
                {FACILITY_OPTIONS.map((option) => {
                  const selected = form.facilities.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleFacility(option.value)}
                      aria-pressed={selected}
                      data-ocid={`admin_halls.facility.${option.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selected
                          ? "border-primary bg-primary/12 text-primary"
                          : "border-border bg-background text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeForm}
              disabled={saving}
              data-ocid="admin_halls.form_cancel_button"
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={submitForm}
              disabled={saving}
              data-ocid="admin_halls.form_submit_button"
            >
              {saving ? (
                <Loader2
                  className="mr-1.5 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : null}
              {editing ? "Simpan Perubahan" : "Tambah Aula"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deactivateTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeactivateTarget(null);
        }}
      >
        <DialogContent data-ocid="admin_halls.deactivate_dialog">
          <DialogHeader>
            <DialogTitle>Nonaktifkan Aula</DialogTitle>
            <DialogDescription>
              Aula{" "}
              <span className="font-medium text-foreground">
                {deactivateTarget?.name}
              </span>{" "}
              tidak akan menerima pemesanan baru. Data dan riwayat pemesanan
              tetap tersimpan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeactivateTarget(null)}
              disabled={deactivateHall.isPending}
              data-ocid="admin_halls.deactivate_cancel_button"
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDeactivate}
              disabled={deactivateHall.isPending}
              data-ocid="admin_halls.deactivate_confirm_button"
            >
              {deactivateHall.isPending ? (
                <Loader2
                  className="mr-1.5 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : null}
              Nonaktifkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
