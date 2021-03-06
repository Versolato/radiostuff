import 'module-alias/register';

import {writeToCsv} from '@helpers/fs-helpers';
import {createLog} from '@helpers/log-helpers';
import {RepeaterStructured} from '@interfaces/repeater-structured';
import {Chirp, ChirpDuplex, ChirpToneMode,} from '@interfaces/chirp';
import chalk from 'chalk';
import {
  buildDCS,
  filterInputFrequencies,
  filterMode,
  filterOutputFrequencies,
  FrequencyBand,
  loadRepeaters,
  loadSimplex,
  Mode,
  RadioCommon,
  radioCommon,
} from '@helpers/radio-helpers';
import {program} from 'commander';
import gpsDistance from 'gps-distance';
import {checkCoordinates, splitCoordinates} from '@helpers/helpers';

const log: (...msg: any[]) => void = createLog('Make Chirp');

// const homePoint: Point = [39.627071500, -104.893322500]; // 4982 S Ulster St
// const DenverPoint: Point = [39.742043, -104.991531];
// const ColoradoSpringsPoint: Point = [38.846127, -104.800644];

log('Program Setup');

program
  .version('0.0.1')
  .arguments('<location> <name>')
  .action(async (location: string, name: string): Promise<void> => {
    log('Program Action', location, name);
    if (location) {
      const latLong: gpsDistance.Point = splitCoordinates(location);
      if (checkCoordinates(latLong)) {
        await doIt(latLong, `../data/repeaters/chirp/${ name }`);
      }
    }
  });

log('Program Parse Args');

program.parse(process.argv);

async function doIt(location: gpsDistance.Point, outFileName: string): Promise<void> {
  // const simplex: RepeaterStructured[] = await loadSimplex(/FM|SAT|ISS|MURS|GMRS|FRS/i);
  const simplex: RepeaterStructured[] = await loadSimplex(/FM|SAT|ISS/i);
  const repeaters: RepeaterStructured[] = await loadRepeaters(location);

  const mapped: Chirp[] = [
    ...simplex
      .filter(filterOutputFrequencies(
        FrequencyBand.$2_m,
        FrequencyBand.$1_25_m,
        FrequencyBand.$70_cm,
        // FrequencyBand.MURS,
        // FrequencyBand.GMRS,
      ))
      .filter(filterInputFrequencies(
        FrequencyBand.$2_m,
        FrequencyBand.$1_25_m,
        FrequencyBand.$70_cm,
        // FrequencyBand.MURS,
        // FrequencyBand.GMRS,
      ))
      .filter((filter) => filter.Callsign !== 'FM Simplex'),
    ...repeaters
      .filter(filterOutputFrequencies(
        FrequencyBand.$2_m,
        FrequencyBand.$1_25_m,
        FrequencyBand.$70_cm,
        // FrequencyBand.MURS,
        // FrequencyBand.GMRS,
      ))
      .filter(filterInputFrequencies(
        FrequencyBand.$2_m,
        FrequencyBand.$1_25_m,
        FrequencyBand.$70_cm,
        // FrequencyBand.MURS,
        // FrequencyBand.GMRS,
      ))
      .filter(filterMode(Mode.FM)),
  ]
    .map((map: RepeaterStructured): Chirp => convertToRadio(map));

  await saveSubset(mapped, 128, `${outFileName}-128`);
  await saveSubset(mapped, 200, `${outFileName}-200`);
}

async function saveSubset(mapped: Chirp[], length: number, fileName: string): Promise<void> {
  const subset: Chirp[] = mapped.slice(0, length);

  const duplexFilter = (filter: Chirp): boolean => filter.Duplex !== ChirpDuplex.Simplex || filter.Tone !== ChirpToneMode.None;
  // const fmOrDVFilter = (filter: Chirp): boolean => filter['Operating Mode'] === ChirpOperatingMode.FM || filter['Operating Mode'] === ChirpOperatingMode.DV;
  const issOrSatFilter = (filter: Chirp): boolean => /^[A-Z]* ISS/.test(filter.Name) || /^[A-Z]* SAT/.test(filter.Name);
  const sotaOrWarcFilter = (filter: Chirp): boolean => /^[A-Z]* SOTA/.test(filter.Name) || /^[A-Z]* WARC/.test(filter.Name);
  // const gmrsFilter = (filter: Chirp): boolean => /^GMRS/.test(filter.Name) || /^FRS/.test(filter.Name);
  // const mursFilter = (filter: Chirp): boolean => /^MURS/.test(filter.Name);


  const simplexChirp: Chirp[] = subset
    // .filter((filter: Chirp): boolean => !duplexFilter(filter) && !issOrSatFilter(filter) && !sotaOrWarcFilter(filter) && !gmrsFilter(filter) && !mursFilter(filter))
    .filter((filter: Chirp): boolean => !duplexFilter(filter) && !issOrSatFilter(filter) && !sotaOrWarcFilter(filter))
    .sort((a: Chirp, b: Chirp): number => a.Name > b.Name ? 1 : a.Name < b.Name ? - 1 : 0)
    .sort((a: Chirp, b: Chirp): number => a.Frequency - b.Frequency);

  const sotaChirp: Chirp[] = subset
    .filter((filter: Chirp): boolean => sotaOrWarcFilter(filter))
    .sort((a: Chirp, b: Chirp): number => a.Name > b.Name ? 1 : a.Name < b.Name ? - 1 : 0)
    .sort((a: Chirp, b: Chirp): number => a.Frequency - b.Frequency);

  const issChirp: Chirp[] = subset
    .filter((filter: Chirp): boolean => issOrSatFilter(filter))
    .sort((a: Chirp, b: Chirp): number => a.Frequency - b.Frequency)
    .sort((a: Chirp, b: Chirp): number => a.Name > b.Name ? 1 : a.Name < b.Name ? - 1 : 0);

  // const mursChirp: Chirp[] = subset
  //   .filter((filter: Chirp): boolean => mursFilter(filter))
  //   .sort((a: Chirp, b: Chirp): number => a.Name > b.Name ? 1 : a.Name < b.Name ? - 1 : 0)
  //   .sort((a: Chirp, b: Chirp): number => a.Frequency - b.Frequency);

  // const gmrsChirp: Chirp[] = subset
  //   .filter((filter: Chirp): boolean => gmrsFilter(filter))
  //   .sort((a: Chirp, b: Chirp): number => a.Frequency - b.Frequency)
  //   .sort((a: Chirp, b: Chirp): number => parseFloat(a.Name.replace(/[^\d]*/, '')) - parseFloat(b.Name.replace(/[^\d]*/, '')));

  const duplexChirp: Chirp[] = subset
    .filter((filter: Chirp): boolean => duplexFilter(filter) && !issOrSatFilter(filter) && !sotaOrWarcFilter(filter))
    .sort((a: Chirp, b: Chirp): number => a.Frequency - b.Frequency)
    .sort((a: Chirp, b: Chirp): number => a.Name > b.Name ? 1 : a.Name < b.Name ? - 1 : 0);

  // const recombine: Chirp[] = [...simplexChirp, ...mursChirp, ...gmrsChirp, ...sotaChirp, ...issChirp, ...duplexChirp]
  const recombine: Chirp[] = [...simplexChirp, ...sotaChirp, ...issChirp, ...duplexChirp]
    .map((map: Chirp, index: number): Chirp => ({ ...map, Name: map.Name.replace(/^FM /, '').trim().replace(/^SAT /, '').trim(), Location: index }));

  return writeToCsv(fileName, recombine);
}

function convertToRadio(repeater: RepeaterStructured): Chirp {
  const {
    Name,
    Receive,
    Transmit,
    OffsetFrequency,
    TransmitSquelchTone,
    ReceiveSquelchTone,
    TransmitDigitalTone,
    ReceiveDigitalTone,
    Comment,
  }: RadioCommon = radioCommon(repeater);

  let ToneMode: ChirpToneMode = ChirpToneMode.None;

  if (TransmitSquelchTone) {
    ToneMode = ChirpToneMode.Tone; // "TONE ENC";
  } else if (TransmitDigitalTone) {
    ToneMode = ChirpToneMode.DTCS; // "DCS";
  }

  if (TransmitSquelchTone && ReceiveSquelchTone) {
    if (TransmitSquelchTone === ReceiveSquelchTone) {
      ToneMode = ChirpToneMode.T_Sql; // "TONE SQL";
    } else {
      ToneMode = ChirpToneMode.Cross;
    }
  } else if (TransmitDigitalTone && ReceiveDigitalTone && TransmitDigitalTone === ReceiveDigitalTone) {
    if (TransmitDigitalTone === ReceiveDigitalTone) {
      ToneMode = ChirpToneMode.DTCS; // "TONE SQL";
    } else {
      ToneMode = ChirpToneMode.Cross;
    }
  }

  const CTCSS: number = TransmitSquelchTone || 100;
  const Rx_CTCSS: number = ReceiveSquelchTone || TransmitSquelchTone || 100;
  const DCS: number = parseInt(buildDCS(TransmitDigitalTone), 10);
  const Rx_DCS: number = parseInt(buildDCS(ReceiveDigitalTone || TransmitDigitalTone), 10);

  return new Chirp({
    Name,
    Frequency: Receive,
    Duplex: convertOffsetDirection(OffsetFrequency),
    Offset: Transmit, // Math.round(Transmit - Receive * 10000) / 10000,
    Tone: ToneMode,
    rToneFreq: CTCSS,
    cToneFreq: Rx_CTCSS,
    DtcsCode: DCS,
    DtcsRxCode: Rx_DCS,
    Comment,
  });
}

function convertOffsetDirection(OffsetFrequency: number): ChirpDuplex {
  if (OffsetFrequency === 0) {
    return ChirpDuplex.Simplex;
  // } else if (OffsetFrequency < 0) {
  //   return ChirpDuplex.Minus;
  // } else if (OffsetFrequency > 0) {
  //   return ChirpDuplex.Plus;
  } else {
    return ChirpDuplex.Split
  }
  log(chalk.red('ERROR'), 'convertOffsetDirection', 'unknown', OffsetFrequency);
  return ChirpDuplex.Simplex;
}
