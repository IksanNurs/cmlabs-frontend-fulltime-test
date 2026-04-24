'use client';

type SearchFieldProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  label: string;
};

export function SearchField({ value, onChange, placeholder, label }: SearchFieldProps) {
  return (
    <label className="search-card">
      <span className="search-label">{label}</span>
      <input
        className="search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </label>
  );
}
